'use client'

import { VStack, Box, Text, HStack, IconButton } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { brandColors } from '@/theme'
import { useLanguage } from '@/context/LanguageContext'
import Spinner from '@/components/Spinner'
import { toaster } from '@/components/ui/toaster'
import StorySetupModal, { StorySetupData } from '@/components/StorySetupModal'

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
  const { language, setLanguage } = useLanguage()
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [stories, setStories] = useState<Story[]>([])
  const [pendingScenario, setPendingScenario] = useState<string | null>(null)
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''

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

  const handleStart = async (
    scenario: string,
    setupLanguage: string,
    players: StorySetupData['players']
  ) => {
    setIsLoading(scenario)
    try {
      const response = await fetch('/api/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scenario, language: setupLanguage, players }),
      })
      const data = await response.json()

      if (!response.ok || !data.id) {
        throw new Error(data.error || 'Failed to start adventure')
      }

      try {
        sessionStorage.setItem(`avventuraGame:${data.id}`, JSON.stringify(data))
      } catch {
        // sessionStorage unavailable - the game page will fall back to /api/init
      }
      router.push(`/${data.id}`)
      return
    } catch (error) {
      console.error('Failed to start:', error)
      toaster.create({
        description: 'Failed to start the adventure. Please try again.',
        type: 'error',
        duration: 4000,
      })
    }
    setIsLoading(null)
  }

  const handleStorySetupSubmit = (setup: StorySetupData) => {
    localStorage.setItem('avventuraStorySetup', JSON.stringify(setup))
    setLanguage(setup.language)

    if (pendingScenario) {
      handleStart(pendingScenario, setup.language, setup.players)
    }
    setPendingScenario(null)
  }

  const handleCopyUrl = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation()
    const url = `${baseUrl}/${slug}`
    navigator.clipboard.writeText(url)
    toaster.create({
      description: 'URL copied to clipboard',
      type: 'success',
      duration: 2000,
    })
  }

  return (
    <Box minH="100vh">
      <VStack gap={8} align="center" justify="center" minH="100vh" p={8}>
        {isLoading ? (
          <Spinner size={200} />
        ) : (
          <VStack gap={4} width="100%" maxW="800px">
            {stories.map(story => (
              <Box
                key={story.slug}
                onClick={() => setPendingScenario(story.slug)}
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
                <VStack align="start" gap={2} width="100%">
                  <Text fontSize="lg" fontWeight="semibold">
                    {story.homepage_display[language]?.title || story.title}
                  </Text>
                  <Text fontSize="sm" opacity={0.8} lineHeight="1.5">
                    {story.homepage_display[language]?.description || ''}
                  </Text>
                  <HStack width="100%" mt={2} gap={2}>
                    <Text
                      as="button"
                      fontSize="xs"
                      fontFamily="monospace"
                      flex={1}
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      color={brandColors.accent}
                      textAlign="left"
                      cursor="pointer"
                      onClick={e => handleCopyUrl(e, story.slug)}
                      _hover={{
                        textDecoration: 'underline',
                      }}
                    >
                      {baseUrl}/{story.slug}
                    </Text>
                    <IconButton
                      aria-label="Copy URL"
                      size="sm"
                      variant="ghost"
                      colorScheme="whiteAlpha"
                      onClick={e => handleCopyUrl(e, story.slug)}
                      _hover={{
                        bg: brandColors.secondary,
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    </IconButton>
                  </HStack>
                </VStack>
              </Box>
            ))}
          </VStack>
        )}
      </VStack>
      <StorySetupModal
        isOpen={pendingScenario !== null}
        onClose={() => setPendingScenario(null)}
        onSubmit={handleStorySetupSubmit}
      />
    </Box>
  )
}
