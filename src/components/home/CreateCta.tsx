'use client'

import { Box, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'
import { brandColors } from '@/theme'

export default function CreateCta() {
  const t = useTranslation()

  return (
    <Box as="section" width="100%" textAlign="center" py={{ base: 12, md: 20 }}>
      <Link
        asChild
        color={brandColors.accent}
        fontSize={{ base: '4xl', md: '6xl' }}
        fontWeight="bold"
        lineHeight="1.1"
        _hover={{ textDecoration: 'underline', color: brandColors.primary }}
      >
        <NextLink href="/edit">{t.landing.ctaTitle}</NextLink>
      </Link>
    </Box>
  )
}
