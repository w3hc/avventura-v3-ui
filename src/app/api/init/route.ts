import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { id } = await request.json()

    const response = await fetch('https://api.avventura.fun/state', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameId: id }),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch game state')
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error calling init API:', error)
    return NextResponse.json({ error: 'Failed to fetch game state' }, { status: 500 })
  }
}
