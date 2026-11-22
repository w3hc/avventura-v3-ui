'use client'

import { Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslation } from '@/hooks/useTranslation'
import { toaster } from '@/components/ui/toaster'
import { brandColors } from '@/theme'

export interface Story {
  slug: string
  title: string
  homepage_display: {
    [key: string]: {
      title: string
      description: string
    }
  }
}

interface StoryCardProps {
  story: Story
  onSelect: (slug: string) => void
}

export default function StoryCard({ story, onSelect }: StoryCardProps) {
  const { language } = useLanguage()
  const t = useTranslation()
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''

  const handleCopyUrl = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(`${baseUrl}/${story.slug}`)
    toaster.create({
      description: t.common.urlCopied,
      type: 'success',
      duration: 2000,
    })
  }

  return (
    <Box
      onClick={() => onSelect(story.slug)}
      cursor="pointer"
      _hover={{
        transform: 'translateY(-2px)',
        borderColor: brandColors.secondary,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      }}
      transition="all 0.2s ease-in-out"
      bg={brandColors.black}
      color={brandColors.white}
      border="2px solid"
      borderColor={brandColors.primary}
      px={6}
      py={5}
      borderRadius="lg"
      width="100%"
      height="100%"
    >
      <VStack align="start" gap={2} width="100%" height="100%">
        <Text fontSize="lg" fontWeight="semibold">
          {story.homepage_display[language]?.title || story.title}
        </Text>
        <Text fontSize="sm" opacity={0.8} lineHeight="1.5" flex={1}>
          {story.homepage_display[language]?.description || ''}
        </Text>
        <HStack width="100%" mt={2} gap={2}>
          <Text
            as="button"
            fontSize="xs"
            fontFamily="monospace"
            flex={1}
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            color={brandColors.accent}
            textAlign="left"
            cursor="pointer"
            onClick={handleCopyUrl}
            _hover={{ textDecoration: 'underline' }}
          >
            {baseUrl}/{story.slug}
          </Text>
          <IconButton
            aria-label={t.common.copyUrlAriaLabel}
            size="sm"
            variant="ghost"
            colorScheme="whiteAlpha"
            onClick={handleCopyUrl}
            _hover={{ bg: brandColors.secondary }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </IconButton>
        </HStack>
      </VStack>
    </Box>
  )
}
