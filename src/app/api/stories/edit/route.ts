import { NextResponse } from 'next/server'
import { FORWARDED_STATUSES, forwardedAuthorization } from '@/utils/siwe'

export const maxDuration = 600

export async function POST(request: Request) {
  try {
    const { slug, updates } = await request.json()

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    if (!updates || typeof updates !== 'object') {
      return NextResponse.json({ error: 'Updates object is required' }, { status: 400 })
    }

    const authorization = forwardedAuthorization(request)
    if (!authorization) {
      return NextResponse.json({ error: 'Bearer token is required' }, { status: 401 })
    }

    const apiUrl = process.env.AVVENTURA_API_URL || process.env.NEXT_PUBLIC_AVVENTURA_API_URL
    const response = await fetch(`${apiUrl}/stories/edit`, {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        ...authorization,
      },
      body: JSON.stringify({ slug, updates }),
      signal: AbortSignal.timeout(600000),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API error response:', response.status, errorText)
      if (FORWARDED_STATUSES.includes(response.status)) {
        return NextResponse.json({ error: errorText }, { status: response.status })
      }
      throw new Error('Failed to edit story')
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error editing story:', error)
    return NextResponse.json({ error: 'Failed to edit story' }, { status: 500 })
  }
}
