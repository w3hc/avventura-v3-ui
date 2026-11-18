'use client'

import { useEffect, useState, type ReactNode } from 'react'
import NextLink from 'next/link'
import { Box, Flex, HStack, Heading, Link as ChakraLink, Text, VStack } from '@chakra-ui/react'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Spinner from '@/components/Spinner'
import { useLanguage } from '@/context/LanguageContext'
import { useLoginFlow } from '@/context/LoginFlow'
import { SignInError, useSession } from '@/context/Session'
import { useW3PK } from '@/context/W3PK'
import { useTranslation } from '@/hooks/useTranslation'
import { brandColors } from '@/theme'

interface Me {
  address: string
  balance: number
  stories: { slug: string; title: string; spent: number }[]
}

type LoadError = 'signIn' | 'load'

function formatEur(amount: number, language: string): string {
  const tiny = amount !== 0 && Math.abs(amount) < 0.01
  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency: 'EUR',
    ...(tiny ? { maximumSignificantDigits: 2 } : {}),
  }).format(amount)
}

function DashboardSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card.Root bg={brandColors.black} borderColor={brandColors.primary} borderWidth="1px">
      <Card.Body gap={4}>
        <Heading as="h2" size="md" color={brandColors.white}>
          {title}
        </Heading>
        {children}
      </Card.Body>
    </Card.Root>
  )
}

export default function DashboardPage() {
  const t = useTranslation()
  const { language } = useLanguage()
  const { isAuthReady, isAuthenticated } = useW3PK()
  const { startLogin } = useLoginFlow()
  const { authFetch } = useSession()
  const [me, setMe] = useState<Me | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<LoadError | null>(null)

  const load = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await authFetch('/api/me', { cache: 'no-store' })
      if (!response.ok) {
        throw new Error(`Failed to load the account: ${response.status}`)
      }
      setMe(await response.json())
    } catch (err) {
      console.error('Failed to load the dashboard:', err)
      setError(err instanceof SignInError ? 'signIn' : 'load')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMe(null)
      return
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  const renderContent = () => {
    if (!isAuthReady || (isAuthenticated && isLoading && !me)) {
      return (
        <Flex justify="center" py={12}>
          <Spinner size="lg" />
        </Flex>
      )
    }

    if (!isAuthenticated) {
      return (
        <VStack gap={4} align="start">
          <Text color={brandColors.white}>{t.dashboard.loginRequired}</Text>
          <Button
            bg={brandColors.primary}
            color={brandColors.white}
            _hover={{ bg: brandColors.secondary }}
            onClick={startLogin}
          >
            {t.common.login}
          </Button>
        </VStack>
      )
    }

    if (!me) {
      return (
        <VStack gap={4} align="start">
          <Text color="red.400">
            {error === 'signIn' ? t.dashboard.signInFailed : t.dashboard.loadFailed}
          </Text>
          <Button
            bg={brandColors.primary}
            color={brandColors.white}
            _hover={{ bg: brandColors.secondary }}
            onClick={load}
            loading={isLoading}
          >
            {t.dashboard.retry}
          </Button>
        </VStack>
      )
    }

    const isBalanceEmpty = me.balance <= 0

    return (
      <VStack gap={6} align="stretch">
        <DashboardSection title={t.dashboard.balance}>
          <Text
            fontSize="3xl"
            fontWeight="bold"
            color={isBalanceEmpty ? 'red.400' : brandColors.white}
          >
            {formatEur(me.balance, language)}
          </Text>
          {isBalanceEmpty && (
            <Alert.Root status="warning">
              <Alert.Indicator />
              <Alert.Title>{t.dashboard.balanceEmpty}</Alert.Title>
            </Alert.Root>
          )}
        </DashboardSection>

        <DashboardSection title={t.dashboard.stories}>
          {me.stories.length === 0 ? (
            <VStack gap={2} align="start">
              <Text color={brandColors.white} opacity={0.8}>
                {t.dashboard.noStories}
              </Text>
              <ChakraLink asChild color={brandColors.accent}>
                <NextLink href="/edit">{t.dashboard.createStory}</NextLink>
              </ChakraLink>
            </VStack>
          ) : (
            <VStack as="ul" gap={3} align="stretch" listStyleType="none">
              {me.stories.map(story => (
                <Flex
                  as="li"
                  key={story.slug}
                  justify="space-between"
                  align={{ base: 'start', md: 'center' }}
                  direction={{ base: 'column', md: 'row' }}
                  gap={2}
                  py={2}
                  borderBottomWidth="1px"
                  borderColor="whiteAlpha.200"
                >
                  <Box>
                    <ChakraLink asChild color={brandColors.white} fontWeight="semibold">
                      <NextLink href={`/${story.slug}`}>{story.title}</NextLink>
                    </ChakraLink>
                    <Text fontSize="sm" color={brandColors.white} opacity={0.7}>
                      {t.dashboard.spent}: {formatEur(story.spent, language)}
                    </Text>
                  </Box>
                  <HStack gap={4}>
                    <ChakraLink asChild color={brandColors.accent} fontSize="sm">
                      <NextLink href={`/${story.slug}`}>{t.dashboard.play}</NextLink>
                    </ChakraLink>
                    <ChakraLink asChild color={brandColors.accent} fontSize="sm">
                      <NextLink href={`/edit/${story.slug}`}>{t.dashboard.edit}</NextLink>
                    </ChakraLink>
                  </HStack>
                </Flex>
              ))}
            </VStack>
          )}
        </DashboardSection>
      </VStack>
    )
  }

  return (
    <Box minH="100vh" py={8}>
      <VStack gap={6} align="stretch" maxW="800px" mx="auto" pt={24}>
        <Heading as="h1" size="2xl" color={brandColors.white}>
          {t.dashboard.title}
        </Heading>
        {renderContent()}
      </VStack>
    </Box>
  )
}
