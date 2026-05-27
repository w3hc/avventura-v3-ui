import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Read directly from the stories.json file in the backend
    const storiesPath = join(process.cwd(), '..', 'avventura-v3', 'stories', 'stories.json')
    const storiesData = readFileSync(storiesPath, 'utf-8')
    const stories: StoryData[] = JSON.parse(storiesData)

    const story = stories.find(s => s.slug === slug)

    if (!story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 })
    }

    return NextResponse.json(story)
  } catch (error) {
    console.error('Error fetching story:', error)
    return NextResponse.json({ error: 'Failed to fetch story' }, { status: 500 })
  }
}
