'use client'

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import NextLink from 'next/link'
import { Box, Flex, HStack, Heading, Link as ChakraLink, Text, VStack } from '@chakra-ui/react'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { toaster } from '@/components/ui/toaster'
import Spinner from '@/components/Spinner'
import { useLanguage } from '@/context/LanguageContext'
import { useLoginFlow } from '@/context/LoginFlow'
import { SignInError, useSession } from '@/context/Session'
import { useW3PK } from '@/context/W3PK'
import { useTranslation } from '@/hooks/useTranslation'
import { brandColors } from '@/theme'
import { bearerHeaders } from '@/utils/siwe'
import {
  AutoTopupCard,
  AutoTopupForm,
  AutoTopupPaused,
  CARD_PAUSED_KEY,
  type AutoTopup,
} from './AutoTopup'
import { MAX_TOPUP, MIN_TOPUP, formatEur, parseEuros } from './euros'
import { FeeEstimate } from './FeeEstimate'

interface Me {
  address: string
  balance: number
  stories: { slug: string; title: string; spent: number }[]
  autoTopup: AutoTopup | null
}

type LoadError = 'signIn' | 'load'

type TopUpError = 'invalid' | 'unavailable' | 'signIn' | 'failed'

type TopUpReturn = 'pending' | 'credited' | 'delayed' | 'cancelled'

type CardReturn = 'pending' | 'saved' | 'delayed' | 'cancelled'

// Balance before the redirect to Stripe, read back on the return
const TOPUP_BALANCE_KEY = 'avventura.topup.balance'

// Stripe's webhook (credited balance, saved card) may land after its redirect
const POLL_INTERVAL_MS = 2000
const POLL_ATTEMPTS = 10

type ReturnToastType = 'loading' | 'success' | 'warning' | 'info'

const TOPUP_TOAST_TYPE = {
  pending: 'loading',
  credited: 'success',
  delayed: 'warning',
  cancelled: 'info',
} as const satisfies Record<TopUpReturn, ReturnToastType>

const CARD_TOAST_TYPE = {
  pending: 'loading',
  saved: 'success',
  delayed: 'warning',
  cancelled: 'info',
} as const satisfies Record<CardReturn, ReturnToastType>

const RETURN_TOAST_DURATION_MS = 5000

// A saved card clears a pause, so replacing the card of a paused auto top-up
// is done once it is unpaused. Replacing a working card can't be observed.
const isCardReady = (me: Me, wasPaused: boolean) =>
  !!me.autoTopup?.hasCard && !(wasPaused && me.autoTopup.paused)

function removeQueryParam(name: string): void {
  const params = new URLSearchParams(window.location.search)
  params.delete(name)
  const query = params.toString()
  window.history.replaceState(
    null,
    '',
    `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`
  )
}

// A loading toast stays up until the status settles or the page is left
function useReturnToast<S extends string>(
  name: string,
  status: S | null,
  types: Record<S, ReturnToastType>,
  text: Record<S, string>
) {
  useEffect(() => {
    if (!status) return
    const type = types[status]
    const id = toaster.create({
      id: `${name}-${status}`,
      description: text[status],
      type,
      ...(type !== 'loading' && { duration: RETURN_TOAST_DURATION_MS }),
    })
    if (type === 'loading') return () => toaster.dismiss(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])
}

function DashboardSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card.Root bg={brandColors.black} borderColor={brandColors.primary} borderWidth="1px">
      <Card.Body gap={4} p={{ base: 5, md: 8 }}>
        <Heading as="h2" size="md" color={brandColors.white}>
          {title}
        </Heading>
        {children}
      </Card.Body>
    </Card.Root>
  )
}

function TopUpForm({ balance }: { balance: number }) {
  const t = useTranslation()
  const { language } = useLanguage()
  const { authFetch } = useSession()
  const [value, setValue] = useState('')
  const [error, setError] = useState<TopUpError | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const min = formatEur(MIN_TOPUP, language)
  const max = formatEur(MAX_TOPUP, language)

  // Back from Stripe with the browser's back button, the page comes from the bfcache
  useEffect(() => {
    const reset = (event: PageTransitionEvent) => {
      if (event.persisted) setIsSubmitting(false)
    }
    window.addEventListener('pageshow', reset)
    return () => window.removeEventListener('pageshow', reset)
  }, [])

  const errorText = {
    invalid: t.dashboard.topUpInvalid(min, max),
    unavailable: t.dashboard.topUpUnavailable,
    signIn: t.dashboard.signInFailed,
    failed: t.dashboard.topUpFailed,
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const amount = parseEuros(value, MIN_TOPUP, MAX_TOPUP)
    if (amount === null) {
      setError('invalid')
      return
    }

    setError(null)
    setIsSubmitting(true)
    try {
      const response = await authFetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      })
      if (response.status === 400 || response.status === 503) {
        setError(response.status === 400 ? 'invalid' : 'unavailable')
        setIsSubmitting(false)
        return
      }
      if (!response.ok) {
        throw new Error(`Failed to start the checkout: ${response.status}`)
      }
      const { url }: { url: string } = await response.json()
      try {
        sessionStorage.setItem(TOPUP_BALANCE_KEY, String(balance))
      } catch {}
      window.location.assign(url)
    } catch (err) {
      console.error('Failed to start the top-up:', err)
      setError(err instanceof SignInError ? 'signIn' : 'failed')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <VStack gap={4} align="stretch">
        <Field
          invalid={error === 'invalid'}
          label={t.dashboard.topUpAmount}
          errorText={error === 'invalid' ? errorText.invalid : undefined}
        >
          <Input
            inputMode="decimal"
            autoComplete="off"
            maxW="200px"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="20"
            color={brandColors.white}
          />
        </Field>
        <FeeEstimate amount={parseEuros(value, MIN_TOPUP, MAX_TOPUP)} />
        {error && error !== 'invalid' && <Text color="red.400">{errorText[error]}</Text>}
        <Button
          type="submit"
          alignSelf="start"
          bg={brandColors.primary}
          color={brandColors.white}
          _hover={{ bg: brandColors.secondary }}
          loading={isSubmitting}
        >
          {t.dashboard.topUpButton}
        </Button>
      </VStack>
    </form>
  )
}

export default function DashboardPage() {
  const t = useTranslation()
  const { language } = useLanguage()
  const { isAuthReady, isAuthenticated } = useW3PK()
  const { startLogin } = useLoginFlow()
  const { session, signIn, signOut } = useSession()
  const [me, setMe] = useState<Me | null>(null)
  const [error, setError] = useState<LoadError | null>(null)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [topUp, setTopUp] = useState<TopUpReturn | null>(null)
  const [card, setCard] = useState<CardReturn | null>(null)
  const topUpBaseline = useRef<number | null>(null)
  const cardWasPaused = useRef(false)
  const latestLoad = useRef(0)

  const token = session?.token ?? null

  const load = async (sessionToken: string): Promise<Me | null> => {
    const id = ++latestLoad.current
    setError(null)
    try {
      const response = await fetch('/api/me', {
        headers: bearerHeaders(sessionToken),
        cache: 'no-store',
      })
      if (response.status === 401) {
        if (id !== latestLoad.current) return null
        toaster.create({ description: t.session.expired, type: 'info', duration: 5000 })
        await signOut()
        return null
      }
      if (!response.ok) {
        throw new Error(`Failed to load the account: ${response.status}`)
      }
      const data: Me = await response.json()
      if (id !== latestLoad.current) return null
      setMe(data)
      return data
    } catch (err) {
      console.error('Failed to load the dashboard:', err)
      if (id === latestLoad.current) setError('load')
      return null
    }
  }

  const handleSignIn = async () => {
    setIsSigningIn(true)
    setError(null)
    try {
      await signIn()
    } catch {
      setError('signIn')
    } finally {
      setIsSigningIn(false)
    }
  }

  useEffect(() => {
    if (!isAuthenticated || !token) {
      latestLoad.current++
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMe(null)
      return
    }
    load(token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, token])

  useEffect(() => {
    const result = new URLSearchParams(window.location.search).get('topup')
    if (result !== 'success' && result !== 'cancel') return

    try {
      const stored = sessionStorage.getItem(TOPUP_BALANCE_KEY)
      sessionStorage.removeItem(TOPUP_BALANCE_KEY)
      const balance = Number(stored)
      topUpBaseline.current = stored !== null && Number.isFinite(balance) ? balance : null
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTopUp(result === 'success' ? 'pending' : 'cancelled')

    removeQueryParam('topup')
  }, [])

  useEffect(() => {
    const result = new URLSearchParams(window.location.search).get('card')
    if (result !== 'saved' && result !== 'cancel') return

    try {
      cardWasPaused.current = sessionStorage.getItem(CARD_PAUSED_KEY) === 'true'
      sessionStorage.removeItem(CARD_PAUSED_KEY)
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCard(result === 'saved' ? 'pending' : 'cancelled')
    removeQueryParam('card')
  }, [])

  const isPolling = topUp === 'pending' && !!token && !!me

  useEffect(() => {
    if (!isPolling || !token || !me) return
    let cancelled = false
    const start = topUpBaseline.current ?? me.balance

    const poll = async () => {
      let balance = me.balance
      for (let attempt = 0; balance === start && attempt < POLL_ATTEMPTS; attempt++) {
        await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS))
        if (cancelled) return
        balance = (await load(token))?.balance ?? balance
        if (cancelled) return
      }
      setTopUp(balance === start ? 'delayed' : 'credited')
    }

    poll()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPolling, token])

  const isCardPolling = card === 'pending' && !!token && !!me

  useEffect(() => {
    if (!isCardPolling || !token || !me) return
    let cancelled = false

    const poll = async () => {
      let current = me
      const isReady = (account: Me) => isCardReady(account, cardWasPaused.current)
      for (let attempt = 0; !isReady(current) && attempt < POLL_ATTEMPTS; attempt++) {
        await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS))
        if (cancelled) return
        current = (await load(token)) ?? current
        if (cancelled) return
      }
      setCard(isReady(current) ? 'saved' : 'delayed')
    }

    poll()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCardPolling, token])

  useReturnToast('topup', topUp, TOPUP_TOAST_TYPE, {
    pending: t.dashboard.topUpPending,
    credited: t.dashboard.topUpCredited,
    delayed: t.dashboard.topUpDelayed,
    cancelled: t.dashboard.topUpCancelled,
  })

  useReturnToast('card', card, CARD_TOAST_TYPE, {
    pending: t.dashboard.cardPending,
    saved: t.dashboard.cardSaved,
    delayed: t.dashboard.cardDelayed,
    cancelled: t.dashboard.cardCancelled,
  })

  const renderContent = () => {
    if (!isAuthReady || (isAuthenticated && token && !me && !error)) {
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

    if (!token) {
      return (
        <VStack gap={4} align="start">
          <Text color={brandColors.white}>{t.dashboard.signInPrompt}</Text>
          {error === 'signIn' && <Text color="red.400">{t.dashboard.signInFailed}</Text>}
          <Button
            bg={brandColors.primary}
            color={brandColors.white}
            _hover={{ bg: brandColors.secondary }}
            onClick={handleSignIn}
            loading={isSigningIn}
          >
            {t.dashboard.signIn}
          </Button>
        </VStack>
      )
    }

    if (!me) {
      return (
        <VStack gap={4} align="start">
          <Text color="red.400">{t.dashboard.loadFailed}</Text>
          <Button
            bg={brandColors.primary}
            color={brandColors.white}
            _hover={{ bg: brandColors.secondary }}
            onClick={() => load(token)}
          >
            {t.dashboard.retry}
          </Button>
        </VStack>
      )
    }

    const isCrediting = topUp === 'pending'
    const isBalanceEmpty = !isCrediting && me.balance <= 0

    return (
      <VStack gap={6} align="stretch">
        <DashboardSection title={t.dashboard.balance}>
          {isCrediting ? (
            <Box py={1}>
              <Spinner size="md" />
            </Box>
          ) : (
            <Text
              fontSize="3xl"
              fontWeight="bold"
              color={isBalanceEmpty ? 'red.400' : brandColors.white}
            >
              {formatEur(me.balance, language)}
            </Text>
          )}
          {isBalanceEmpty && (
            <Alert.Root status="warning">
              <Alert.Indicator />
              <Alert.Title>{t.dashboard.balanceEmpty}</Alert.Title>
            </Alert.Root>
          )}
        </DashboardSection>

        <DashboardSection title={t.dashboard.topUpTitle}>
          <TopUpForm balance={me.balance} />
        </DashboardSection>

        <DashboardSection title={t.dashboard.autoTopUpTitle}>
          {me.autoTopup?.paused && <AutoTopupPaused reason={me.autoTopup.pausedReason} />}
          <AutoTopupForm
            autoTopup={me.autoTopup}
            onSaved={autoTopup => setMe(current => current && { ...current, autoTopup })}
          />
          <AutoTopupCard hasCard={!!me.autoTopup?.hasCard} paused={!!me.autoTopup?.paused} />
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

        <DashboardSection title={t.dashboard.wallet}>
          <Text fontFamily="mono" fontSize="sm" color={brandColors.white} wordBreak="break-all">
            {me.address}
          </Text>
        </DashboardSection>
      </VStack>
    )
  }

  return (
    <Box minH="100vh" py={8} px={4}>
      <VStack gap={6} align="stretch" maxW="800px" mx="auto" pt={24}>
        <Heading as="h1" size="2xl" color={brandColors.white}>
          {t.dashboard.title}
        </Heading>
        {renderContent()}
      </VStack>
    </Box>
  )
}
