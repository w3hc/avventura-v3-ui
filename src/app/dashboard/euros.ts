// Bounds of the API's top-up amounts (checkout and auto top-up), in euros
export const MIN_TOPUP = 5
export const MAX_TOPUP = 500

// Stripe's fee for standard EEA cards; the API credits the actual fee
const STRIPE_FEE_RATE = 0.015
const STRIPE_FEE_FIXED = 0.25

export const estimateStripeFee = (amount: number): number =>
  Math.round((amount * STRIPE_FEE_RATE + STRIPE_FEE_FIXED) * 100) / 100

// A euro amount typed by the user, with at most 2 decimals, within [min, max]
export function parseEuros(value: string, min: number, max = Infinity): number | null {
  const normalized = value.trim().replace(',', '.')
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return null
  const amount = Number(normalized)
  return amount >= min && amount <= max ? amount : null
}

export function formatEur(amount: number, language: string): string {
  const tiny = amount !== 0 && Math.abs(amount) < 0.01
  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency: 'EUR',
    ...(tiny ? { maximumSignificantDigits: 2 } : {}),
  }).format(amount)
}
