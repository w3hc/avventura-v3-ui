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
