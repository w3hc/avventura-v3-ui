import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { gameId, choiceIndex } = await request.json()
    console.log('🔵 /api/move called with:', { gameId, choiceIndex })

    const apiUrl = process.env.AVVENTURA_API_URL || process.env.NEXT_PUBLIC_AVVENTURA_API_URL
    const response = await fetch(`${apiUrl}/move`, {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameId, choiceIndex }),
    })

    if (!response.ok) {
      throw new Error('Failed to make move')
    }

    const data = await response.json()
    console.log('✅ Avventura API /move response:', data)

    return NextResponse.json(data)
  } catch (error) {
    console.error('❌ Error calling move API:', error)
    return NextResponse.json({ error: 'Failed to make move' }, { status: 500 })
  }
}
