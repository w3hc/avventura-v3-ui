import { NextResponse } from 'next/server'
import { FORWARDED_STATUSES, forwardedSiweHeaders } from '@/utils/siwe'

export const maxDuration = 600

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const siwe = forwardedSiweHeaders(request)
    if (!siwe) {
      return NextResponse.json({ error: 'SIWE signature is required' }, { status: 401 })
    }

    const apiUrl = process.env.AVVENTURA_API_URL || process.env.NEXT_PUBLIC_AVVENTURA_API_URL
    console.log('Creating story with API URL:', apiUrl)

    const response = await fetch(`${apiUrl}/stories`, {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        ...siwe,
      },
      body: JSON.stringify({ prompt }),
      signal: AbortSignal.timeout(600000),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API error response:', response.status, errorText)
      if (FORWARDED_STATUSES.includes(response.status)) {
        return NextResponse.json({ error: errorText }, { status: response.status })
      }
      throw new Error(`Failed to create story: ${response.status} ${errorText}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating story:', error)
    return NextResponse.json({ error: 'Failed to create story' }, { status: 500 })
  }
}
