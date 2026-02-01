'use client'

import { VStack, Box, Heading, Text, Link } from '@chakra-ui/react'
import { useLanguage } from '@/context/LanguageContext'
import { use, useEffect, useState } from 'react'
import { brandColors } from '@/theme'

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

export default function AdventurePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { language } = useLanguage()
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [loading, setLoading] = useState(true)
  const [isProcessingMove, setIsProcessingMove] = useState(false)

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
    if (!gameState || isProcessingMove) return

    // Immediately display the nextSteps[optionIndex]
    const nextStep = gameState.nextSteps[optionIndex]
    console.log('📋 Displaying nextStep from cache:', nextStep)
    if (nextStep) {
      setGameState({
        ...gameState,
        currentStep: nextStep,
      })
    }

    // Call move API in background
    setIsProcessingMove(true)
    console.log('🚀 Calling /api/move with choiceIndex:', optionIndex + 1)
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
      console.log('✅ Move API response received:', data)
      // Update with actual response from API
      updateGameState({
        ...gameState,
        ...data,
      })
      console.log('🔄 GameState updated with API response')
    } catch (error) {
      console.error('❌ Error making move:', error)
    } finally {
      setIsProcessingMove(false)
    }
  }

  useEffect(() => {
    const initGame = async () => {
      console.log('🎮 Initializing game with id:', id)
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
        console.log('🔄 Initial gameState set')
      } catch (error) {
        console.error('❌ Error initializing game:', error)
      } finally {
        setLoading(false)
      }
    }

    initGame()
  }, [id])

  if (loading) {
    return (
      <VStack gap={8} align="center" justify="center" minH="100vh">
        <Text>Loading...</Text>
      </VStack>
    )
  }

  if (!gameState) {
    return (
      <VStack gap={8} align="center" justify="center" minH="100vh">
        <Text>Failed to load game state</Text>
      </VStack>
    )
  }

  return (
    <Box px={{ base: 4, md: 8 }} py={8} maxW="1200px" mx="auto">
      <Text fontSize={{ base: 'xl', md: '2xl' }} mb={8} whiteSpace="pre-wrap" textAlign="left">
        {gameState.currentStep.desc}
      </Text>

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
            // opacity={isProcessingMove ? 0.5 : 1}
            pointerEvents={isProcessingMove ? 'none' : 'auto'}
            onClick={e => {
              e.preventDefault()
              handleOptionClick(index)
            }}
          >
            {option}
          </Link>
        ))}
      </VStack>
    </Box>
  )
}
