import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiUrl = process.env.AVVENTURA_API_URL || process.env.NEXT_PUBLIC_AVVENTURA_API_URL
    const response = await fetch(`${apiUrl}/auth/nonce`, { cache: 'no-store' })

    if (!response.ok) {
      throw new Error(`Failed to get nonce: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('Error getting SIWE nonce:', error)
    return NextResponse.json({ error: 'Failed to get nonce' }, { status: 500 })
  }
}
