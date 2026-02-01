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

  useEffect(() => {
    const initGame = async () => {
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
        setGameState(data)
      } catch (error) {
        console.error('Error initializing game:', error)
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
      <Text
        fontSize={{ base: "xl", md: "2xl" }}
        mb={8}
        whiteSpace="pre-wrap"
        textAlign="left"
      >
        {gameState.currentStep.desc}
      </Text>

      <VStack gap={4} align="stretch">
        {gameState.currentStep.options.map((option, index) => (
          <Link
            key={index}
            href="#"
            color={brandColors.accent}
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="medium"
            _hover={{ textDecoration: 'underline' }}
            textAlign="left"
          >
            {option}
          </Link>
        ))}
      </VStack>
    </Box>
  )
}
