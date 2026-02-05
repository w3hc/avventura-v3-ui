'use client'

import { VStack, Box, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { brandColors } from '@/theme'
import { useLanguage } from '@/context/LanguageContext'

export default function Home() {
  const router = useRouter()
  const { language } = useLanguage()
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const scenarios = [
    { id: 'in-the-forest', label: 'Dans la forêt' },
    { id: 'montpellier-medieval', label: 'Montpellier médiéval' },
    { id: 'sailing', label: 'Expédition scientifique en mer' },
  ]

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
          <Text fontSize="2xl" fontWeight="semibold" color={brandColors.white}>
            {scenarios.find(s => s.id === isLoading)?.label}...
          </Text>
        ) : (
          <VStack gap={6} width="100%" maxW="600px">
            {scenarios.map(scenario => (
              <Box
                key={scenario.id}
                onClick={() => handleStart(scenario.id)}
                cursor="pointer"
                position="relative"
                _hover={{
                  transform: 'scale(1.05)',
                  borderColor: brandColors.secondary,
                }}
                transition="all 0.2s ease-in-out"
                style={{
                  perspective: '1000px',
                }}
                bg={brandColors.black}
                color={brandColors.white}
                border="2px solid"
                borderColor={brandColors.primary}
                px={16}
                py={8}
                borderRadius="1.5rem"
                fontSize="2xl"
                fontWeight="semibold"
                textAlign="center"
                width="100%"
              >
                <Text>{scenario.label}</Text>
              </Box>
            ))}
          </VStack>
        )}
      </VStack>
    </Box>
  )
}
