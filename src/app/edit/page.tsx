'use client'

import { VStack, Box, Text, Textarea, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { brandColors } from '@/theme'
import Spinner from '@/components/Spinner'
import { useLanguage } from '@/context/LanguageContext'
import { useW3PK } from '@/context/W3PK'
import { useTranslations } from '@/translations'
import { siweHeaders } from '@/utils/siwe'

export default function CreateStoryPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const t = useTranslations(language)
  const { isAuthenticated, login, signSiwe } = useW3PK()
  const [prompt, setPrompt] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreate = async () => {
    if (!prompt.trim()) {
      setError(t.createStory.pleaseEnterPrompt)
      return
    }

    if (!isAuthenticated) {
      setError(t.createStory.loginRequired)
      try {
        await login()
        setError(null)
      } catch {
        // login() already reports what went wrong
      }
      return
    }

    setError(null)

    let siwe
    try {
      siwe = await signSiwe('POST', '/stories')
    } catch (err) {
      console.error('Failed to sign story creation:', err)
      setError(t.createStory.signatureFailed)
      return
    }

    setIsCreating(true)

    try {
      const response = await fetch('/api/stories/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...siweHeaders(siwe),
        },
        body: JSON.stringify({ prompt }),
      })

      if (response.status === 401) {
        setError(t.createStory.signatureFailed)
        return
      }

      if (!response.ok) {
        throw new Error('Failed to create story')
      }

      const data = await response.json()

      if (data.slug) {
        router.push(`/edit/${data.slug}`)
      }
    } catch (err) {
      console.error('Failed to create story:', err)
      setError(t.createStory.failedToCreate)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Box minH="100vh" p={8}>
      <VStack gap={6} align="stretch" maxW="800px" mx="auto" pt={24}>
        <Text fontSize="2xl" fontWeight="bold" color={brandColors.white}>
          {t.createStory.title}
        </Text>

        <Text fontSize="md" color={brandColors.white} opacity={0.8}>
          {t.createStory.instructions}
        </Text>

        <VStack gap={4} align="stretch">
          <Textarea
            placeholder={t.createStory.promptPlaceholder}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            size="lg"
            minH="200px"
            bg={brandColors.black}
            color={brandColors.white}
            borderColor={brandColors.primary}
            _hover={{ borderColor: brandColors.secondary }}
            _focus={{ borderColor: brandColors.accent }}
            disabled={isCreating}
            px={4}
            py={3}
          />

          {error && (
            <Text color="red.400" fontSize="sm">
              {error}
            </Text>
          )}

          <Button
            onClick={handleCreate}
            loading={isCreating}
            spinner={<Spinner size="200px" />}
            size="lg"
            bg={isCreating ? brandColors.black : brandColors.primary}
            color={brandColors.white}
            _hover={{ bg: isCreating ? brandColors.black : brandColors.secondary }}
            disabled={isCreating}
          >
            {t.createStory.createButton}
          </Button>
        </VStack>
      </VStack>
    </Box>
  )
}
