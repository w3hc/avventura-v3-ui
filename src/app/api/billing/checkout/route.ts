import { NextResponse } from 'next/server'
import { FORWARDED_STATUSES, forwardedAuthorization } from '@/utils/siwe'

// 503: Stripe isn't configured on the API
const CHECKOUT_STATUSES = [...FORWARDED_STATUSES, 503]

export async function POST(request: Request) {
  try {
    const authorization = forwardedAuthorization(request)
    if (!authorization) {
      return NextResponse.json({ error: 'Bearer token is required' }, { status: 401 })
    }

    const body = await request.json().catch(() => null)
    const amount = body?.amount
    if (typeof amount !== 'number' || !Number.isFinite(amount)) {
      return NextResponse.json({ error: 'amount must be a number' }, { status: 400 })
    }

    const apiUrl = process.env.AVVENTURA_API_URL || process.env.NEXT_PUBLIC_AVVENTURA_API_URL
    const response = await fetch(`${apiUrl}/billing/checkout`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        ...authorization,
      },
      body: JSON.stringify({ amount }),
      cache: 'no-store',
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API error response:', response.status, errorText)
      if (CHECKOUT_STATUSES.includes(response.status)) {
        return NextResponse.json({ error: errorText }, { status: response.status })
      }
      throw new Error(`Failed to start the checkout: ${response.status}`)
    }

    const { url } = await response.json()
    if (typeof url !== 'string' || !url.startsWith('https://')) {
      throw new Error('The API returned no checkout URL')
    }

    return NextResponse.json({ url }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('Error starting checkout:', error)
    return NextResponse.json({ error: 'Failed to start the checkout' }, { status: 500 })
  }
}
