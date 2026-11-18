import { NextResponse } from 'next/server'
import { FORWARDED_STATUSES } from '@/utils/siwe'

export async function POST(request: Request) {
  try {
    const { message, signature } = await request.json()

    if (typeof message !== 'string' || typeof signature !== 'string') {
      return NextResponse.json({ error: 'Message and signature are required' }, { status: 400 })
    }

    const apiUrl = process.env.AVVENTURA_API_URL || process.env.NEXT_PUBLIC_AVVENTURA_API_URL
    const response = await fetch(`${apiUrl}/auth/siwe`, {
      method: 'POST',
      headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, signature }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API error response:', response.status, errorText)
      if (FORWARDED_STATUSES.includes(response.status)) {
        return NextResponse.json({ error: errorText }, { status: response.status })
      }
      throw new Error(`Failed to sign in: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('Error signing in:', error)
    return NextResponse.json({ error: 'Failed to sign in' }, { status: 500 })
  }
}
