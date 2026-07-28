import { NextResponse } from 'next/server'

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

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params

    const apiUrl = process.env.AVVENTURA_API_URL || process.env.NEXT_PUBLIC_AVVENTURA_API_URL
    const response = await fetch(`${apiUrl}/stories/${slug}`)

    if (response.status === 404) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 })
    }

    if (!response.ok) {
      throw new Error('Failed to fetch story')
    }

    const story: StoryData = await response.json()

    return NextResponse.json(story)
  } catch (error) {
    console.error('Error fetching story:', error)
    return NextResponse.json({ error: 'Failed to fetch story' }, { status: 500 })
  }
}
