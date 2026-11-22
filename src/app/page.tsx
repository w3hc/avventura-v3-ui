'use client'

import { VStack, Box } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import Spinner from '@/components/Spinner'
import { toaster } from '@/components/ui/toaster'
import StorySetupModal, { StorySetupData } from '@/components/StorySetupModal'
import { useTranslations } from '@/translations'
import FakeGame from '@/components/home/FakeGame'
import StoryGrid from '@/components/home/StoryGrid'
import Pitch from '@/components/home/Pitch'
import CreateCta from '@/components/home/CreateCta'
import { Story } from '@/components/home/StoryCard'

const FEATURED_SLUGS = [
  'aquaterra-2150',
  'port-royal-1692',
  'steam-powered-gta-blackout',
  'post-apocalyptic-survival-music',
  'kingston',
  'heart-of-the-earth',
]

export default function Home() {
  const router = useRouter()
  const { language, setLanguage } = useLanguage()
  const t = useTranslations(language)
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [stories, setStories] = useState<Story[]>([])
  const [pendingScenario, setPendingScenario] = useState<string | null>(null)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/api/stories')
        const data = await response.json()
        if (Array.isArray(data)) setStories(data)
      } catch (error) {
        console.error('Failed to fetch stories:', error)
      }
    }
    fetchStories()
  }, [])

  const featured = FEATURED_SLUGS.map(slug => stories.find(s => s.slug === slug)).filter(
    (s): s is Story => s !== undefined
  )

  const handleStart = async (
    scenario: string,
    setupLanguage: string,
    players: StorySetupData['players'],
    difficulty: StorySetupData['difficulty'],
    textLength: StorySetupData['textLength']
  ) => {
    setIsLoading(scenario)
    try {
      const response = await fetch('/api/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scenario,
          language: setupLanguage,
          players,
          difficulty,
          textLength,
        }),
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
        description: t.game.failedToStart,
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
      handleStart(
        pendingScenario,
        setup.language,
        setup.players,
        setup.difficulty,
        setup.textLength
      )
    }
    setPendingScenario(null)
  }

  if (isLoading) {
    return (
      <VStack align="center" justify="center" minH="100vh">
        <Spinner size={200} />
      </VStack>
    )
  }

  return (
    <Box minH="100vh">
      <FakeGame />
      <VStack
        gap={{ base: 16, md: 24 }}
        width="100%"
        maxW="1200px"
        mx="auto"
        px={{ base: 4, md: 8 }}
        pb={{ base: 16, md: 24 }}
      >
        <StoryGrid
          title={t.landing.featuredTitle}
          stories={featured}
          onSelect={setPendingScenario}
        />
        <Pitch />
        <CreateCta />
        <StoryGrid
          title={t.landing.allStoriesTitle}
          stories={stories}
          onSelect={setPendingScenario}
        />
      </VStack>
      <StorySetupModal
        isOpen={pendingScenario !== null}
        onClose={() => setPendingScenario(null)}
        onSubmit={handleStorySetupSubmit}
      />
    </Box>
  )
}
