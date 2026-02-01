import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { scenario, language } = await request.json()

    const response = await fetch(`${process.env.NEXT_PUBLIC_AVVENTURA_API_URL}/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        story: scenario,
        language: language || 'fr',
      }),
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
