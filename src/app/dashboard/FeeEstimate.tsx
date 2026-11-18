'use client'

import { Text } from '@chakra-ui/react'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslation } from '@/hooks/useTranslation'
import { brandColors } from '@/theme'
import { estimateStripeFee, formatEur } from './euros'

export function FeeEstimate({ amount }: { amount: number | null }) {
  const t = useTranslation()
  const { language } = useLanguage()
  if (amount === null) return null
  const fee = estimateStripeFee(amount)
  return (
    <Text fontSize="sm" color={brandColors.white} opacity={0.7}>
      {t.dashboard.topUpFeeEstimate(
        formatEur(amount, language),
        formatEur(fee, language),
        formatEur(amount - fee, language)
      )}
    </Text>
  )
}
