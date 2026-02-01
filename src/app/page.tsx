'use client'

import { VStack, Box } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleStart = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/start', {
        method: 'POST',
      })
      const data = await response.json()

      if (data.id) {
        router.push(`/${data.id}`)
      }
    } catch (error) {
      console.error('Failed to start:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack gap={8} align="center" justify="center" minH="100vh">
      <Box textAlign="center">
        <Button
          colorPalette="blue"
          size="xl"
          onClick={handleStart}
          loading={isLoading}
          px={16}
          py={8}
          fontSize="2xl"
        >
          Start
        </Button>
      </Box>
    </VStack>
  )
}
