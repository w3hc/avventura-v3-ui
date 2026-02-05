import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_AVVENTURA_API_URL}/stories`)

    if (!response.ok) {
      throw new Error('Failed to fetch stories')
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error calling stories API:', error)
    return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 })
  }
}
