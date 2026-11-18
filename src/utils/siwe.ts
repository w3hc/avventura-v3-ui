export interface SiweAuth {
  message: string
  signature: string
}

export const SIWE_MESSAGE_HEADER = 'x-siwe-message'
export const SIWE_SIGNATURE_HEADER = 'x-siwe-signature'

// HTTP header values can't contain raw newlines, and a SIWE message is
// multi-line, so it travels percent-encoded (the API guard decodes it back).
export function siweHeaders(siwe: SiweAuth): Record<string, string> {
  return {
    [SIWE_MESSAGE_HEADER]: encodeURIComponent(siwe.message),
    [SIWE_SIGNATURE_HEADER]: siwe.signature,
  }
}

// Route handlers pass the client's SIWE headers through to the API unchanged.
export function forwardedSiweHeaders(request: Request): Record<string, string> | null {
  const message = request.headers.get(SIWE_MESSAGE_HEADER)
  const signature = request.headers.get(SIWE_SIGNATURE_HEADER)
  if (!message || !signature) return null
  return { [SIWE_MESSAGE_HEADER]: message, [SIWE_SIGNATURE_HEADER]: signature }
}

export const SIGN_IN_STATEMENT = 'Sign in to Avventura'

export interface Session {
  token: string
  address: string
  expiresAt: string
}

export function bearerHeaders(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` }
}

export function forwardedAuthorization(request: Request): Record<string, string> | null {
  const authorization = request.headers.get('authorization')
  if (!authorization || !/^bearer \S+$/i.test(authorization)) return null
  return { Authorization: authorization }
}

// API statuses the pages handle themselves, rather than as a generic failure.
export const FORWARDED_STATUSES = [400, 401, 403, 404]
