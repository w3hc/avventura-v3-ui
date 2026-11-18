import { NextResponse } from 'next/server'
import { FORWARDED_STATUSES, forwardedAuthorization } from '@/utils/siwe'

export async function GET(request: Request) {
  try {
    const authorization = forwardedAuthorization(request)
    if (!authorization) {
      return NextResponse.json({ error: 'Bearer token is required' }, { status: 401 })
    }

    const apiUrl = process.env.AVVENTURA_API_URL || process.env.NEXT_PUBLIC_AVVENTURA_API_URL
    const response = await fetch(`${apiUrl}/me`, {
      headers: { accept: 'application/json', ...authorization },
      cache: 'no-store',
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API error response:', response.status, errorText)
      if (FORWARDED_STATUSES.includes(response.status)) {
        return NextResponse.json({ error: errorText }, { status: response.status })
      }
      throw new Error(`Failed to fetch account: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('Error fetching account:', error)
    return NextResponse.json({ error: 'Failed to fetch account' }, { status: 500 })
  }
}
