'use client'

import {
  VStack,
  Box,
  Text,
  Input,
  Button,
  Textarea,
  HStack,
  Link,
  IconButton,
} from '@chakra-ui/react'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { brandColors } from '@/theme'
import { Checkbox } from '@/components/ui/checkbox'
import { useLanguage } from '@/context/LanguageContext'
import { toaster } from '@/components/ui/toaster'
import { useTranslations } from '@/translations'

interface StoryData {
  slug: string
  title: string
  content: string
  homepage_display: unknown
  is_active: boolean
  created_at: string
  updated_at: string
  sessions?: number
  requests?: number
}

export default function EditStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()
  const { language } = useLanguage()
  const t = useTranslations(language)
  const [story, setStory] = useState<StoryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Form fields
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    content: '',
    homepage_display: '{}',
    is_active: true,
  })

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`/api/stories/${slug}`)

        if (!response.ok) {
          setError(t.editStory.storyNotFound)
          setLoading(false)
          return
        }

        const foundStory: StoryData = await response.json()

        setStory(foundStory)
        setFormData({
          slug: foundStory.slug,
          title: foundStory.title,
          content: foundStory.content,
          homepage_display:
            typeof foundStory.homepage_display === 'string'
              ? foundStory.homepage_display
              : JSON.stringify(foundStory.homepage_display, null, 2),
          is_active: foundStory.is_active,
        })
      } catch (err) {
        console.error('Failed to fetch story:', err)
        setError(t.editStory.failedToLoadStory)
      } finally {
        setLoading(false)
      }
    }

    fetchStory()
    // Only re-fetch when the slug changes, not on language switches mid-fetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)
    setSuccessMessage(null)

    try {
      // Parse homepage_display JSON
      let homepage_display
      try {
        homepage_display = JSON.parse(formData.homepage_display)
      } catch (err) {
        setError(t.editStory.invalidJson)
        setIsSaving(false)
        return
      }

      const updates = {
        slug: formData.slug,
        title: formData.title,
        content: formData.content,
        homepage_display,
        is_active: formData.is_active,
      }

      const response = await fetch('/api/stories/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug, updates }),
      })

      if (!response.ok) {
        throw new Error('Failed to save story')
      }

      const data = await response.json()
      setStory(data)
      setSuccessMessage(t.editStory.savedSuccessfully)

      // If slug changed, redirect to new slug
      if (formData.slug !== slug) {
        setTimeout(() => {
          router.push(`/edit/${formData.slug}`)
        }, 1000)
      }
    } catch (err) {
      console.error('Failed to save story:', err)
      setError(t.editStory.failedToSave)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toaster.create({
      description: t.common.urlCopied,
      type: 'success',
      duration: 2000,
    })
  }

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''

  if (loading) {
    return (
      <Box minH="100vh" p={8}>
        <VStack gap={8} align="center" justify="center" minH="100vh">
          <Text color={brandColors.white}>{t.common.loading}</Text>
        </VStack>
      </Box>
    )
  }

  if (error && !story) {
    return (
      <Box minH="100vh" p={8}>
        <VStack gap={8} align="center" justify="center" minH="100vh">
          <Text color="red.400">{error}</Text>
          <Button
            onClick={() => router.push('/edit')}
            bg={brandColors.primary}
            color={brandColors.white}
          >
            {t.editStory.backToCreate}
          </Button>
        </VStack>
      </Box>
    )
  }

  return (
    <Box minH="100vh" p={8}>
      <VStack gap={6} align="stretch" maxW="1200px" mx="auto" pt={24}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold" color={brandColors.white} mb={3}>
            {t.editStory.title}
          </Text>
          <VStack align="start" gap={1}>
            <HStack gap={2}>
              <Text color={brandColors.white} fontSize="sm" opacity={0.8}>
                {t.editStory.playLabel}
              </Text>
              <Link
                href={`/${slug}`}
                color={brandColors.accent}
                fontSize="sm"
                fontFamily="monospace"
                onClick={e => {
                  e.preventDefault()
                  handleCopyUrl(`${baseUrl}/${slug}`)
                }}
                _hover={{
                  textDecoration: 'underline',
                }}
              >
                {baseUrl}/{slug}
              </Link>
              <IconButton
                aria-label={t.common.copyUrlAriaLabel}
                size="xs"
                variant="ghost"
                colorScheme="whiteAlpha"
                onClick={() => handleCopyUrl(`${baseUrl}/${slug}`)}
                _hover={{
                  bg: brandColors.secondary,
                }}
              >
                <svg
                  width="12"
                  height="12"
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
            <HStack gap={2}>
              <Text color={brandColors.white} fontSize="sm" opacity={0.8}>
                {t.editStory.editLabel}
              </Text>
              <Link
                href={`/edit/${slug}`}
                color={brandColors.accent}
                fontSize="sm"
                fontFamily="monospace"
                onClick={e => {
                  e.preventDefault()
                  handleCopyUrl(`${baseUrl}/edit/${slug}`)
                }}
                _hover={{
                  textDecoration: 'underline',
                }}
              >
                {baseUrl}/edit/{slug}
              </Link>
              <IconButton
                aria-label={t.common.copyUrlAriaLabel}
                size="xs"
                variant="ghost"
                colorScheme="whiteAlpha"
                onClick={() => handleCopyUrl(`${baseUrl}/edit/${slug}`)}
                _hover={{
                  bg: brandColors.secondary,
                }}
              >
                <svg
                  width="12"
                  height="12"
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

        <VStack gap={4} align="stretch">
          <Box>
            <Text fontSize="sm" mb={2} color={brandColors.white} opacity={0.8}>
              {t.editStory.slugLabel}
            </Text>
            <Input
              value={formData.slug}
              onChange={e => setFormData({ ...formData, slug: e.target.value })}
              size="lg"
              bg={brandColors.black}
              color={brandColors.white}
              borderColor={brandColors.primary}
              _hover={{ borderColor: brandColors.secondary }}
              _focus={{ borderColor: brandColors.accent }}
              disabled={isSaving}
              px={4}
            />
          </Box>

          <Box>
            <Text fontSize="sm" mb={2} color={brandColors.white} opacity={0.8}>
              {t.editStory.titleLabel}
            </Text>
            <Input
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              size="lg"
              bg={brandColors.black}
              color={brandColors.white}
              borderColor={brandColors.primary}
              _hover={{ borderColor: brandColors.secondary }}
              _focus={{ borderColor: brandColors.accent }}
              disabled={isSaving}
              px={4}
            />
          </Box>

          <Box>
            <Text fontSize="sm" mb={2} color={brandColors.white} opacity={0.8}>
              {t.editStory.contentLabel}
            </Text>
            <Textarea
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              size="lg"
              minH="300px"
              bg={brandColors.black}
              color={brandColors.white}
              borderColor={brandColors.primary}
              _hover={{ borderColor: brandColors.secondary }}
              _focus={{ borderColor: brandColors.accent }}
              disabled={isSaving}
              fontFamily="monospace"
              px={4}
              py={3}
            />
          </Box>

          <Box>
            <Text fontSize="sm" mb={2} color={brandColors.white} opacity={0.8}>
              {t.editStory.homepageDisplayLabel}
            </Text>
            <Textarea
              value={formData.homepage_display}
              onChange={e => setFormData({ ...formData, homepage_display: e.target.value })}
              size="lg"
              minH="200px"
              bg={brandColors.black}
              color={brandColors.white}
              borderColor={brandColors.primary}
              _hover={{ borderColor: brandColors.secondary }}
              _focus={{ borderColor: brandColors.accent }}
              disabled={isSaving}
              fontFamily="monospace"
              px={4}
              py={3}
            />
          </Box>

          <Box>
            <Checkbox
              checked={formData.is_active}
              onCheckedChange={e => setFormData({ ...formData, is_active: !!e.checked })}
              disabled={isSaving}
            >
              <Text color={brandColors.white}>{t.editStory.activeLabel}</Text>
            </Checkbox>
          </Box>

          {error && (
            <Text color="red.400" fontSize="sm">
              {error}
            </Text>
          )}

          {successMessage && (
            <Text color="green.400" fontSize="sm">
              {successMessage}
            </Text>
          )}

          <Button
            onClick={handleSave}
            loading={isSaving}
            loadingText={t.editStory.savingText}
            size="lg"
            bg={brandColors.primary}
            color={brandColors.white}
            _hover={{ bg: brandColors.secondary }}
            disabled={isSaving}
          >
            {t.editStory.saveChanges}
          </Button>
        </VStack>

        {story && (
          <Box
            mt={8}
            p={4}
            borderRadius="md"
            bg={brandColors.black}
            borderColor={brandColors.primary}
            borderWidth="1px"
          >
            <Text fontSize="sm" color={brandColors.white} opacity={0.6}>
              {t.editStory.createdLabel}
              {new Date(story.created_at).toLocaleString()}
            </Text>
            <Text fontSize="sm" color={brandColors.white} opacity={0.6}>
              {t.editStory.updatedLabel}
              {new Date(story.updated_at).toLocaleString()}
            </Text>
            {story.sessions !== undefined && (
              <Text fontSize="sm" color={brandColors.white} opacity={0.6}>
                {t.editStory.sessionsLabel}
                {story.sessions}
              </Text>
            )}
            {story.requests !== undefined && (
              <Text fontSize="sm" color={brandColors.white} opacity={0.6}>
                {t.editStory.requestsLabel}
                {story.requests}
              </Text>
            )}
          </Box>
        )}
      </VStack>
    </Box>
  )
}
