'use client'

import { VStack, Box, Text, Textarea, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { brandColors } from '@/theme'
import Spinner from '@/components/Spinner'

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

        <Text fontSize="md" color={brandColors.white} opacity={0.8}>
          In what world does the story take place? What will happen? Any milestones you want players
          to achieve? Don&apos;t worry about being rough—the assistant will edit it cleanly.
        </Text>

        <VStack gap={4} align="stretch">
          <Textarea
            placeholder="Enter a prompt for your story..."
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
            Create
          </Button>
        </VStack>
      </VStack>
    </Box>
  )
}
