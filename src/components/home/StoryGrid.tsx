'use client'

import { Heading, SimpleGrid, VStack } from '@chakra-ui/react'
import StoryCard, { Story } from './StoryCard'

interface StoryGridProps {
  title: string
  stories: Story[]
  onSelect: (slug: string) => void
}

export default function StoryGrid({ title, stories, onSelect }: StoryGridProps) {
  if (stories.length === 0) return null

  return (
    <VStack as="section" gap={6} align="stretch" width="100%">
      <Heading as="h2" size={{ base: '2xl', md: '3xl' }}>
        {title}
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
        {stories.map(story => (
          <StoryCard key={story.slug} story={story} onSelect={onSelect} />
        ))}
      </SimpleGrid>
    </VStack>
  )
}
