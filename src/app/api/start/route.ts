import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { scenario } = await request.json()

    const response = await fetch('https://api.avventura.fun/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        story: scenario,
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
