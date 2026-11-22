'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useW3PK } from './W3PK'
import { useLoginFlow } from './LoginFlow'
import { toaster } from '@/components/ui/toaster'
import { useTranslation } from '@/hooks/useTranslation'
import { bearerHeaders, type Session } from '@/utils/siwe'

const STORAGE_KEY = 'avventura.session'

export class SignInError extends Error {
  name = 'SignInError'
}

export class LoginCancelledError extends SignInError {
  name = 'LoginCancelledError'
}

interface SessionType {
  session: Session | null
  /**
   * Sign in with the w3pk wallet and keep the session token for this tab,
   * logging in or registering first if there is no w3pk user. Throws a
   * `LoginCancelledError` if that login is cancelled.
   */
  signIn: () => Promise<Session>
  /** End the session on the API and forget the token */
  signOut: () => Promise<void>
  /**
   * `fetch` with the session token, signing in first if there is none (see
   * `signIn`). On a 401 the token is dropped, a new sign-in is asked and the
   * request is sent once more. Throws a `SignInError` if the sign-in fails or
   * is cancelled.
   */
  authFetch: (input: string, init?: RequestInit) => Promise<Response>
}

const isLive = (session: Session | null): session is Session =>
  !!session && Date.parse(session.expiresAt) > Date.now()

function readStoredSession(): Session | null {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    const session: Session | null = stored ? JSON.parse(stored) : null
    return isLive(session) ? session : null
  } catch {
    return null
  }
}

function storeSession(session: Session | null): void {
  try {
    if (session) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    } else {
      sessionStorage.removeItem(STORAGE_KEY)
    }
  } catch (error) {
    console.error('[Session] Could not update sessionStorage:', error)
  }
}

const SessionContext = createContext<SessionType | null>(null)

export const useSession = (): SessionType => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const { isAuthReady, isAuthenticated, signSiwe } = useW3PK()
  const { startLogin } = useLoginFlow()
  const t = useTranslation()
  const [session, setSession] = useState<Session | null>(readStoredSession)
  const sessionRef = useRef(session)
  const pendingSignIn = useRef<Promise<Session> | null>(null)
  const authState = useRef({ isAuthReady, isAuthenticated })
  const authReadyWaiters = useRef<(() => void)[]>([])

  useEffect(() => {
    authState.current = { isAuthReady, isAuthenticated }
    if (isAuthReady) {
      authReadyWaiters.current.forEach(resolve => resolve())
      authReadyWaiters.current = []
    }
  }, [isAuthReady, isAuthenticated])

  // Waits for the saved w3pk session to be restored, so that a user who has
  // one isn't asked to log in again
  const ensureLoggedIn = useCallback(async (): Promise<void> => {
    if (!authState.current.isAuthReady) {
      await new Promise<void>(resolve => authReadyWaiters.current.push(resolve))
    }
    if (authState.current.isAuthenticated) return
    if (!(await startLogin())) {
      throw new LoginCancelledError('Login cancelled')
    }
  }, [startLogin])

  const update = useCallback((next: Session | null) => {
    sessionRef.current = next
    storeSession(next)
    setSession(next)
  }, [])

  const signIn = useCallback((): Promise<Session> => {
    pendingSignIn.current ??= (async () => {
      try {
        await ensureLoggedIn()
        const nonceResponse = await fetch('/api/auth/nonce', { cache: 'no-store' })
        if (!nonceResponse.ok) {
          throw new Error(`Failed to get a sign-in nonce: ${nonceResponse.status}`)
        }
        const { nonce } = await nonceResponse.json()
        const { message, signature } = await signSiwe(nonce)

        const response = await fetch('/api/auth/siwe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, signature }),
        })
        if (!response.ok) {
          throw new Error(`Sign-in refused: ${response.status} ${await response.text()}`)
        }

        const next: Session = await response.json()
        update(next)
        return next
      } catch (error) {
        if (error instanceof LoginCancelledError) throw error
        console.error('[Session] Sign-in failed:', error)
        throw new SignInError(error instanceof Error ? error.message : 'Sign-in failed')
      } finally {
        pendingSignIn.current = null
      }
    })()
    return pendingSignIn.current
  }, [ensureLoggedIn, signSiwe, update])

  const signOut = useCallback(async (): Promise<void> => {
    const current = sessionRef.current
    if (!current) return
    update(null)
    try {
      await fetch('/api/auth/logout', { method: 'POST', headers: bearerHeaders(current.token) })
    } catch (error) {
      console.error('[Session] Logout request failed:', error)
    }
  }, [update])

  const authFetch = useCallback(
    async (input: string, init: RequestInit = {}): Promise<Response> => {
      const send = (token: string) => {
        const headers = new Headers(init.headers)
        headers.set('Authorization', `Bearer ${token}`)
        return fetch(input, { ...init, headers })
      }

      const current = isLive(sessionRef.current) ? sessionRef.current : await signIn()
      const response = await send(current.token)
      if (response.status !== 401) return response

      update(null)
      toaster.create({ description: t.session.expired, type: 'info', duration: 5000 })
      return send((await signIn()).token)
    },
    [signIn, update, t]
  )

  // A wallet logout from anywhere ends the creator session too
  useEffect(() => {
    if (isAuthReady && !isAuthenticated && sessionRef.current) {
      signOut()
    }
  }, [isAuthReady, isAuthenticated, signOut])

  const value = useMemo(
    () => ({ session, signIn, signOut, authFetch }),
    [session, signIn, signOut, authFetch]
  )

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
