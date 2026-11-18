import { NextResponse } from 'next/server'
import { FORWARDED_STATUSES, forwardedAuthorization } from '@/utils/siwe'

export async function POST(request: Request) {
  try {
    const authorization = forwardedAuthorization(request)
    if (!authorization) {
      return NextResponse.json({ error: 'Bearer token is required' }, { status: 401 })
    }

    const apiUrl = process.env.AVVENTURA_API_URL || process.env.NEXT_PUBLIC_AVVENTURA_API_URL
    const response = await fetch(`${apiUrl}/auth/logout`, {
      method: 'POST',
      headers: { accept: '*/*', ...authorization },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API error response:', response.status, errorText)
      if (FORWARDED_STATUSES.includes(response.status)) {
        return NextResponse.json({ error: errorText }, { status: response.status })
      }
      throw new Error(`Failed to sign out: ${response.status}`)
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error signing out:', error)
    return NextResponse.json({ error: 'Failed to sign out' }, { status: 500 })
  }
}
