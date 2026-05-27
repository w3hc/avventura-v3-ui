'use client'

import { VStack, Box, Text, Input, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { brandColors } from '@/theme'

export default function CreateStoryPage() {
  const router = useRouter()
  const [prompt, setPrompt] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    setIsCreating(true)
    setError(null)

    try {
      const response = await fetch('/api/stories/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error('Failed to create story')
      }

      const data = await response.json()

      if (data.slug) {
        router.push(`/edit/${data.slug}`)
      }
    } catch (err) {
      console.error('Failed to create story:', err)
      setError('Failed to create story. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Box minH="100vh" p={8}>
      <VStack gap={6} align="stretch" maxW="800px" mx="auto" pt={24}>
        <Text fontSize="2xl" fontWeight="bold" color={brandColors.white}>
          Create New Story
        </Text>

        <VStack gap={4} align="stretch">
          <Input
            placeholder="Enter a prompt for your story..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            size="lg"
            bg={brandColors.black}
            color={brandColors.white}
            borderColor={brandColors.primary}
            _hover={{ borderColor: brandColors.secondary }}
            _focus={{ borderColor: brandColors.accent }}
            disabled={isCreating}
            px={4}
          />

          {error && (
            <Text color="red.400" fontSize="sm">
              {error}
            </Text>
          )}

          <Button
            onClick={handleCreate}
            isLoading={isCreating}
            loadingText="Creating..."
            size="lg"
            bg={brandColors.primary}
            color={brandColors.white}
            _hover={{ bg: brandColors.secondary }}
            disabled={isCreating}
          >
            Create
          </Button>
        </VStack>
      </VStack>
    </Box>
  )
}
