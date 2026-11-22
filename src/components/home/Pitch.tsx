'use client'

import { Heading, Link, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from '@/hooks/useTranslation'
import { brandColors } from '@/theme'

const API_DOCS_URL = 'https://api.avventura.fun/'

export default function Pitch() {
  const t = useTranslation()

  const points = [
    { title: t.landing.pitchPlayTitle, text: t.landing.pitchPlayText },
    { title: t.landing.pitchEditTitle, text: t.landing.pitchEditText },
    { title: t.landing.pitchApiTitle, text: t.landing.pitchApiText, link: true },
  ]

  return (
    <VStack as="section" gap={8} align="stretch" width="100%">
      <Heading as="h2" size={{ base: '2xl', md: '3xl' }}>
        {t.landing.pitchTitle}
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
        {points.map(point => (
          <VStack key={point.title} align="start" gap={2}>
            <Heading as="h3" size="lg" color={brandColors.accent}>
              {point.title}
            </Heading>
            <Text opacity={0.85} lineHeight="1.6">
              {point.text}
            </Text>
            {point.link && (
              <Link
                href={API_DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                color={brandColors.accent}
                textDecoration="underline"
              >
                {t.landing.pitchApiLink}
              </Link>
            )}
          </VStack>
        ))}
      </SimpleGrid>
    </VStack>
  )
}
