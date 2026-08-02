'use client'

import { VStack, Box, Heading, Text, Link } from '@chakra-ui/react'
import { useLanguage } from '@/context/LanguageContext'
import { use, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { brandColors } from '@/theme'
import Spinner from '@/components/Spinner'
import { useTranslations } from '@/translations'
import { toaster } from '@/components/ui/toaster'
import StorySetupModal, { StorySetupData } from '@/components/StorySetupModal'

interface GameState {
  id: string
  story: string
  previously: string
  currentStep: {
    desc: string
    options: string[]
    action: string
  }
  nextSteps: Array<{
    desc: string
    options: string[]
    action: string
  }>
}

interface TypingEffectProps {
  text: string
  speed?: number
  onComplete?: () => void
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 2, onComplete }) => {
  const [state, setState] = useState({ displayText: '', currentIndex: 0, prevText: text })
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const onCompleteRef = useRef(onComplete)

  // Update the ref when onComplete changes
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  // Derive state from text changes
  if (state.prevText !== text) {
    setState({ displayText: '', currentIndex: 0, prevText: text })
  }

  // Handle typing animation
  useEffect(() => {
    if (state.currentIndex < text.length) {
      timeoutRef.current = setTimeout(() => {
        setState(prev => ({
          ...prev,
          displayText: prev.displayText + text[state.currentIndex],
          currentIndex: prev.currentIndex + 1,
        }))
      }, speed)
    } else if (state.currentIndex === text.length && state.displayText.length === text.length) {
      if (onCompleteRef.current) {
        onCompleteRef.current()
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [state.currentIndex, text, speed, state.displayText.length])

  return <span>{state.displayText}</span>
}

export default function AdventurePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { language, setLanguage } = useLanguage()
  const t = useTranslations(language)
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [loading, setLoading] = useState(true)
  const [isProcessingMove, setIsProcessingMove] = useState(false)
  const [isTyping, setIsTyping] = useState(true)
  const [isStartingGame, setIsStartingGame] = useState(false)
  const [waitingForNextMove, setWaitingForNextMove] = useState(false)
  const [showShimmer, setShowShimmer] = useState(false)
  const [showSetupModal, setShowSetupModal] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const startGameWithSetup = async (setup: StorySetupData) => {
    console.log('🎯 Starting new game with story setup')
    localStorage.setItem('avventuraStorySetup', JSON.stringify(setup))
    setLanguage(setup.language)
    setShowSetupModal(false)
    setIsStartingGame(true)
    try {
      const response = await fetch('/api/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scenario: id, language: setup.language, players: setup.players }),
      })

      if (!response.ok) {
        throw new Error('Failed to start game')
      }

      const data = await response.json()

      if (data.id) {
        // Cache the full response so the redirect below doesn't have to
        // re-fetch the state we just got back (avoids a read-after-write
        // race with the backend right after game creation).
        try {
          sessionStorage.setItem(`avventuraGame:${data.id}`, JSON.stringify(data))
        } catch {
          // sessionStorage unavailable (e.g. private browsing) - fine,
          // the game page will just fall back to /api/init
        }
        router.replace(`/${data.id}`)
      } else {
        throw new Error('No game ID returned')
      }
    } catch (error) {
      console.error('❌ Error starting game:', error)
      toaster.create({
        description: t.game.failedToStart,
        type: 'error',
        duration: 4000,
      })
      setIsStartingGame(false)
      setShowSetupModal(true)
    }
  }

  // Update game state from API responses (start, state, move)
  const updateGameState = (data: GameState) => {
    setGameState({
      ...data,
      currentStep: data.currentStep,
      nextSteps: data.nextSteps,
    })
  }

  // Handle option click
  const handleOptionClick = async (optionIndex: number) => {
    console.log('🎯 Option clicked:', optionIndex)

    // If still waiting for previous move, show toast and return
    if (waitingForNextMove) {
      console.log('⚠️ Still waiting for previous move response - showing toast')
      toaster.create({
        description: t.game.waitingMessage,
        type: 'info',
        duration: 2000,
      })
      return
    }

    if (!gameState || isProcessingMove || isTyping) return

    // Immediately display the nextSteps[optionIndex]
    const nextStep = gameState.nextSteps[optionIndex]
    console.log('📋 Displaying nextStep from cache:', nextStep)
    if (nextStep) {
      setGameState({
        ...gameState,
        currentStep: nextStep,
      })
      setIsTyping(true)
      // Scroll to top when new content starts appearing
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }

    // Call move API in background
    setIsProcessingMove(true)
    setWaitingForNextMove(true)
    console.log('🚀 Calling /api/move with choiceIndex:', optionIndex + 1)

    // Start counter
    let counter = 0
    const counterInterval = setInterval(() => {
      counter++
      console.log(`Waiting for next ${counter} sec`)
    }, 1000)

    try {
      const response = await fetch('/api/move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId: id,
          choiceIndex: optionIndex + 1, // API expects 1-indexed
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to make move')
      }

      const data = await response.json()
      clearInterval(counterInterval)
      console.log('✅ Move API response received:', data)
      // Update with actual response from API
      updateGameState({
        ...gameState,
        ...data,
      })
      setWaitingForNextMove(false)
      console.log('🔄 GameState updated with API response')
      // Trigger shimmer on the next options that will appear
      console.log('🌟 Triggering shimmer effect')
      setShowShimmer(true)
      setTimeout(() => {
        console.log('🌟 Stopping shimmer effect')
        setShowShimmer(false)
      }, 400)
    } catch (error) {
      clearInterval(counterInterval)
      setWaitingForNextMove(false)
      console.error('❌ Error making move:', error)
    } finally {
      setIsProcessingMove(false)
    }
  }

  useEffect(() => {
    const initGame = async () => {
      console.log('🎮 Initializing game with id:', id)

      // Check if this is a game session ID (8 capital letters) vs a story slug
      // Game session IDs are 8 uppercase letters, story slugs are kebab-case
      const isGameSessionId = /^[A-Z]{8}$/.test(id)
      const isStorySlug = !isGameSessionId

      if (isStorySlug) {
        console.log('🎯 Detected story slug, prompting for story setup')
        setLoading(false)
        setShowSetupModal(true)
        return
      }

      // Otherwise treat as game session ID.
      // If we just created this game, use the cached /api/start response
      // instead of re-fetching state right away.
      try {
        const cached = sessionStorage.getItem(`avventuraGame:${id}`)
        if (cached) {
          sessionStorage.removeItem(`avventuraGame:${id}`)
          const data = JSON.parse(cached)
          if (data.currentStep && data.currentStep.options) {
            console.log('✅ Using cached game state from /api/start')
            updateGameState(data)
            setIsTyping(true)
            setLoading(false)
            return
          }
        }
      } catch {
        // Fall through to /api/init below
      }

      try {
        const response = await fetch('/api/init', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        })

        if (!response.ok) {
          throw new Error('Failed to initialize game')
        }

        const data = await response.json()
        console.log('✅ Init API response received:', data)
        updateGameState(data)
        setIsTyping(true)
        console.log('🔄 Initial gameState set')
      } catch (error) {
        console.error('❌ Error initializing game:', error)
      } finally {
        setLoading(false)
      }
    }

    initGame()
  }, [id, router])

  if (showSetupModal) {
    return (
      <StorySetupModal
        isOpen={showSetupModal}
        onClose={() => router.push('/')}
        onSubmit={startGameWithSetup}
      />
    )
  }

  if (loading || isStartingGame) {
    return (
      <VStack gap={8} align="center" justify="center" minH="100vh">
        <Spinner size={200} />
      </VStack>
    )
  }

  if (!gameState) {
    return (
      <VStack gap={8} align="center" justify="center" minH="100vh">
        <Text>{t.game.failedToLoadGameState}</Text>
      </VStack>
    )
  }

  const handleTypingComplete = () => {
    setIsTyping(false)
  }

  return (
    <Box
      ref={contentRef}
      px={{ base: 4, md: 8 }}
      py={8}
      pt={{ base: 8, md: 24 }}
      pb={{ base: 32, md: 40 }}
      maxW="1200px"
      mx="auto"
    >
      <Text fontSize={{ base: 'xl', md: '2xl' }} mb={8} whiteSpace="pre-wrap" textAlign="left">
        <TypingEffect
          text={gameState.currentStep.desc}
          speed={2}
          onComplete={handleTypingComplete}
        />
      </Text>

      {!isTyping && (
        <>
          <style>
            {`
              @keyframes shimmer {
                0%, 100% {
                  opacity: 1;
                  color: ${brandColors.accent};
                }
                50% {
                  opacity: 1;
                  color: ${brandColors.primary};
                }
              }
            `}
          </style>
          <VStack gap={4} align="stretch">
            {gameState.currentStep.options.map((option, index) => (
              <Link
                key={index}
                href="#"
                color={brandColors.accent}
                fontSize={{ base: 'xl', md: '2xl' }}
                fontWeight="medium"
                _hover={{ textDecoration: 'underline' }}
                textAlign="left"
                onClick={e => {
                  e.preventDefault()
                  handleOptionClick(index)
                }}
                style={{
                  animation: showShimmer ? 'shimmer 0.4s ease-in-out' : 'none',
                }}
              >
                {option}
              </Link>
            ))}
          </VStack>
        </>
      )}
    </Box>
  )
}
