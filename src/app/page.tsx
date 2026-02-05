'use client'

import { VStack, Box, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { brandColors } from '@/theme'
import { useLanguage } from '@/context/LanguageContext'

interface Story {
  slug: string
  title: string
  homepage_display: {
    [key: string]: {
      title: string
      description: string
    }
  }
}

export default function Home() {
  const router = useRouter()
  const { language } = useLanguage()
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [stories, setStories] = useState<Story[]>([])

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/api/stories')
        const data = await response.json()
        setStories(data)
      } catch (error) {
        console.error('Failed to fetch stories:', error)
      }
    }
    fetchStories()
  }, [])

  const handleStart = async (scenario: string) => {
    setIsLoading(scenario)
    try {
      const response = await fetch('/api/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scenario, language }),
      })
      const data = await response.json()

      if (data.id) {
        router.push(`/${data.id}`)
      }
    } catch (error) {
      console.error('Failed to start:', error)
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <Box minH="100vh">
      <VStack gap={8} align="center" justify="center" minH="100vh" p={8}>
        {isLoading ? (
          <VStack gap={2}>
            <Text fontSize="lg" fontWeight="semibold" color={brandColors.white}>
              {stories.find(s => s.slug === isLoading)?.homepage_display[language]?.title ||
                isLoading}
            </Text>
            <Text fontSize="sm" color={brandColors.white} opacity={0.7}>
              Loading...
            </Text>
          </VStack>
        ) : (
          <VStack gap={4} width="100%" maxW="800px">
            {stories.map(story => (
              <Box
                key={story.slug}
                onClick={() => handleStart(story.slug)}
                cursor="pointer"
                position="relative"
                _hover={{
                  transform: 'translateY(-2px)',
                  borderColor: brandColors.secondary,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                }}
                transition="all 0.2s ease-in-out"
                bg={brandColors.black}
                color={brandColors.white}
                border="2px solid"
                borderColor={brandColors.primary}
                px={6}
                py={5}
                borderRadius="lg"
                width="100%"
              >
                <VStack align="start" gap={2}>
                  <Text fontSize="lg" fontWeight="semibold">
                    {story.homepage_display[language]?.title || story.title}
                  </Text>
                  <Text fontSize="sm" opacity={0.8} lineHeight="1.5">
                    {story.homepage_display[language]?.description || ''}
                  </Text>
                </VStack>
              </Box>
            ))}
          </VStack>
        )}
      </VStack>
    </Box>
  )
}
