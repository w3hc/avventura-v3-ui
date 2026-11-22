'use client'

import { Box, Link, Text, VStack } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useState } from 'react'
import TypingEffect from '@/components/TypingEffect'
import { useTranslation } from '@/hooks/useTranslation'
import { brandColors } from '@/theme'

type Next = number | 'edit'

interface Choice {
  label: string
  next: Next
}

interface Step {
  desc: string
  question: boolean
  choices: Choice[]
}

const choiceStyle = {
  color: brandColors.accent,
  fontSize: { base: 'xl', md: '2xl' },
  fontWeight: 'medium',
  textAlign: 'left',
  _hover: { textDecoration: 'underline' },
} as const

export default function FakeGame() {
  const t = useTranslation()
  const [stepIndex, setStepIndex] = useState(0)
  const [typed, setTyped] = useState(false)

  const steps: Step[] = [
    {
      desc: t.landing.heroStep1,
      question: true,
      choices: [
        { label: t.landing.heroStep1Write, next: 'edit' },
        { label: t.landing.heroStep1Hesitate, next: 1 },
        { label: t.landing.heroStep1Decline, next: 2 },
      ],
    },
    {
      desc: t.landing.heroStep2,
      question: true,
      choices: [
        { label: t.landing.heroStep2Write, next: 'edit' },
        { label: t.landing.heroStep2Refuse, next: 2 },
      ],
    },
    {
      desc: t.landing.heroStep3,
      question: false,
      choices: [{ label: t.landing.heroStep3Write, next: 'edit' }],
    },
  ]

  const step = steps[stepIndex]

  const goTo = (index: number) => {
    setTyped(false)
    setStepIndex(index)
  }

  return (
    <Box
      as="section"
      minH={{ base: '70vh', md: '80vh' }}
      display="flex"
      alignItems="center"
      width="100%"
      maxW="1200px"
      mx="auto"
      px={{ base: 4, md: 8 }}
      py={{ base: 8, md: 16 }}
    >
      <Box width="100%">
        <Text fontSize={{ base: 'xl', md: '2xl' }} mb={8} whiteSpace="pre-wrap" textAlign="left">
          <TypingEffect text={step.desc} speed={12} onComplete={() => setTyped(true)} />
        </Text>

        {typed && (
          <VStack gap={4} align="stretch">
            {step.question && (
              <Text fontSize={{ base: 'xl', md: '2xl' }} mb={2}>
                {t.landing.heroQuestion}
              </Text>
            )}
            {step.choices.map(choice =>
              choice.next === 'edit' ? (
                <Link key={choice.label} asChild {...choiceStyle}>
                  <NextLink href="/edit">{choice.label}</NextLink>
                </Link>
              ) : (
                <Link
                  key={choice.label}
                  as="button"
                  cursor="pointer"
                  {...choiceStyle}
                  onClick={() => goTo(choice.next as number)}
                >
                  {choice.label}
                </Link>
              )
            )}
          </VStack>
        )}
      </Box>
    </Box>
  )
}
