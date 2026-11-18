import { NextResponse } from 'next/server'
import { FORWARDED_STATUSES, forwardedAuthorization } from '@/utils/siwe'

// 503: Stripe isn't configured on the API
const AUTO_TOPUP_STATUSES = [...FORWARDED_STATUSES, 503]

const isOptionalNumber = (value: unknown) =>
  value === undefined || (typeof value === 'number' && Number.isFinite(value))

export async function PUT(request: Request) {
  try {
    const authorization = forwardedAuthorization(request)
    if (!authorization) {
      return NextResponse.json({ error: 'Bearer token is required' }, { status: 401 })
    }

    const body = await request.json().catch(() => null)
    const { enabled, amount, threshold } = body ?? {}
    if (typeof enabled !== 'boolean') {
      return NextResponse.json({ error: 'enabled must be a boolean' }, { status: 400 })
    }
    if (!isOptionalNumber(amount) || !isOptionalNumber(threshold)) {
      return NextResponse.json({ error: 'amount and threshold must be numbers' }, { status: 400 })
    }

    const apiUrl = process.env.AVVENTURA_API_URL || process.env.NEXT_PUBLIC_AVVENTURA_API_URL
    const response = await fetch(`${apiUrl}/billing/auto-topup`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        ...authorization,
      },
      body: JSON.stringify({ enabled, amount, threshold }),
      cache: 'no-store',
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API error response:', response.status, errorText)
      if (AUTO_TOPUP_STATUSES.includes(response.status)) {
        return NextResponse.json({ error: errorText }, { status: response.status })
      }
      throw new Error(`Failed to save the auto top-up: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('Error saving auto top-up:', error)
    return NextResponse.json({ error: 'Failed to save the auto top-up' }, { status: 500 })
  }
}
