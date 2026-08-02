import { NextResponse } from 'next/server'

export const maxDuration = 600

export async function POST(request: Request) {
  try {
    const { scenario, language, players } = await request.json()

    const apiUrl = process.env.AVVENTURA_API_URL || process.env.NEXT_PUBLIC_AVVENTURA_API_URL
    const response = await fetch(`${apiUrl}/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        story: scenario,
        language: language || 'fr',
        players,
      }),
      signal: AbortSignal.timeout(600000),
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
