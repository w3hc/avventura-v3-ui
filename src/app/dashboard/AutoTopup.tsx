'use client'

import { useState, type FormEvent } from 'react'
import { Stack, Switch, Text, VStack } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { toaster } from '@/components/ui/toaster'
import { useLanguage } from '@/context/LanguageContext'
import { SignInError, useSession } from '@/context/Session'
import { useTranslation } from '@/hooks/useTranslation'
import { brandColors } from '@/theme'
import { MAX_TOPUP, MIN_TOPUP, formatEur, parseEuros } from './euros'

export interface AutoTopup {
  enabled: boolean
  amount: number
  threshold: number
  hasCard: boolean
  paused: boolean
  pausedReason: string | null
}

// What the API uses until the creator saves their own settings
const DEFAULT_SETTINGS = { enabled: false, amount: 10, threshold: 5 }

type SettingsError = 'amount' | 'threshold' | 'unavailable' | 'signIn' | 'failed'

export function AutoTopupForm({
  autoTopup,
  onSaved,
}: {
  autoTopup: AutoTopup | null
  onSaved: (autoTopup: AutoTopup) => void
}) {
  const t = useTranslation()
  const { language } = useLanguage()
  const { authFetch } = useSession()
  const saved = autoTopup ?? DEFAULT_SETTINGS
  const [enabled, setEnabled] = useState(saved.enabled)
  const [amount, setAmount] = useState(String(saved.amount))
  const [threshold, setThreshold] = useState(String(saved.threshold))
  const [error, setError] = useState<SettingsError | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const min = formatEur(MIN_TOPUP, language)
  const max = formatEur(MAX_TOPUP, language)
  const parsedAmount = parseEuros(amount, MIN_TOPUP, MAX_TOPUP)
  const parsedThreshold = parseEuros(threshold, 0)

  const errorText = {
    unavailable: t.dashboard.topUpUnavailable,
    signIn: t.dashboard.signInFailed,
    failed: t.dashboard.autoTopUpFailed,
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (parsedAmount === null || parsedThreshold === null) {
      setError(parsedAmount === null ? 'amount' : 'threshold')
      return
    }

    setError(null)
    setIsSaving(true)
    try {
      const response = await authFetch('/api/billing/auto-topup', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled, amount: parsedAmount, threshold: parsedThreshold }),
      })
      if (response.status === 503) {
        setError('unavailable')
        return
      }
      if (!response.ok) {
        throw new Error(`Failed to save the auto top-up: ${response.status}`)
      }
      const data: AutoTopup = await response.json()
      setEnabled(data.enabled)
      setAmount(String(data.amount))
      setThreshold(String(data.threshold))
      onSaved(data)
      toaster.create({ description: t.dashboard.autoTopUpSaved, type: 'success', duration: 3000 })
    } catch (err) {
      console.error('Failed to save the auto top-up:', err)
      setError(err instanceof SignInError ? 'signIn' : 'failed')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <VStack gap={4} align="stretch">
        <Switch.Root
          checked={enabled}
          onCheckedChange={details => setEnabled(details.checked)}
          disabled={isSaving}
        >
          <Switch.HiddenInput />
          <Switch.Control _checked={{ bg: brandColors.primary }}>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label color={brandColors.white}>{t.dashboard.autoTopUpEnabled}</Switch.Label>
        </Switch.Root>
        <Stack direction={{ base: 'column', md: 'row' }} gap={4}>
          <Field
            invalid={error === 'amount'}
            label={t.dashboard.autoTopUpAmount}
            helperText={t.dashboard.topUpLimits(min, max)}
            errorText={error === 'amount' ? t.dashboard.topUpInvalid(min, max) : undefined}
          >
            <Input
              inputMode="decimal"
              autoComplete="off"
              maxW="200px"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              color={brandColors.white}
            />
          </Field>
          <Field
            invalid={error === 'threshold'}
            label={t.dashboard.autoTopUpThreshold}
            errorText={error === 'threshold' ? t.dashboard.autoTopUpInvalidThreshold : undefined}
          >
            <Input
              inputMode="decimal"
              autoComplete="off"
              maxW="200px"
              value={threshold}
              onChange={e => setThreshold(e.target.value)}
              color={brandColors.white}
            />
          </Field>
        </Stack>
        {parsedAmount !== null && parsedThreshold !== null && (
          <Text color={brandColors.white} opacity={enabled ? 1 : 0.6}>
            {t.dashboard.autoTopUpRule(
              formatEur(parsedAmount, language),
              formatEur(parsedThreshold, language)
            )}
          </Text>
        )}
        {error && error !== 'amount' && error !== 'threshold' && (
          <Text color="red.400">{errorText[error]}</Text>
        )}
        <Button
          type="submit"
          alignSelf="start"
          bg={brandColors.primary}
          color={brandColors.white}
          _hover={{ bg: brandColors.secondary }}
          loading={isSaving}
        >
          {t.dashboard.autoTopUpSave}
        </Button>
      </VStack>
    </form>
  )
}
