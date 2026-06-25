import { NextResponse } from 'next/server'

export const maxDuration = 300

export async function POST(request: Request) {
  try {
    const { scenario, language } = await request.json()

    const apiUrl = process.env.AVVENTURA_API_URL || process.env.NEXT_PUBLIC_AVVENTURA_API_URL
    const response = await fetch(`${apiUrl}/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        story: scenario,
        language: language || 'fr',
      }),
      signal: AbortSignal.timeout(300000),
    })

    if (!response.ok) {
      throw new Error('Failed to start adventure')
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error calling start API:', error)
    return NextResponse.json({ error: 'Failed to start adventure' }, { status: 500 })
  }
}
