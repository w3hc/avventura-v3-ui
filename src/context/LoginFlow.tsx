'use client'

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { Text, VStack, Link as ChakraLink, CloseButton } from '@chakra-ui/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field } from '@/components/ui/field'
import { Dialog, Portal } from '@/components/ui/dialog'
import { toaster } from '@/components/ui/toaster'
import Spinner from '@/components/Spinner'
import HomeScreenChoice from '@/components/HomeScreenChoice'
import { useTranslation } from '@/hooks/useTranslation'
import { useW3PK, isNoPasskeyError } from '@/context/W3PK'
import { brandColors } from '@/theme'
import {
  getAuthenticatorCapabilities,
  getAuthenticatorHint,
  hasIOSEvictionRisk,
  type AuthenticatorCapabilities,
} from '@/utils/browserDetection'

interface LoginFlowType {
  // Resolves true once the user is logged in or registered, false otherwise
  startLogin: () => Promise<boolean>
}

const LoginFlowContext = createContext<LoginFlowType | undefined>(undefined)

export const useLoginFlow = (): LoginFlowType => {
  const context = useContext(LoginFlowContext)
  if (!context) {
    throw new Error('useLoginFlow must be used within a LoginFlowProvider')
  }
  return context
}

const validateUsername = (input: string): boolean => {
  if (!input.trim()) {
    return true
  }

  const trimmedInput = input.trim()

  // Check overall format and length (3-50 chars)
  // Alphanumeric, underscore, and hyphen allowed
  // Must start and end with alphanumeric
  return (
    /^[a-zA-Z0-9]([a-zA-Z0-9_-]*[a-zA-Z0-9])?$/.test(trimmedInput) &&
    trimmedInput.length >= 3 &&
    trimmedInput.length <= 50
  )
}

export function LoginFlowProvider({ children }: { children: ReactNode }) {
  const { login, register, hasLocalCredentials } = useW3PK()
  const t = useTranslation()
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false)
  const [showHomeScreenChoice, setShowHomeScreenChoice] = useState(false)
  const [capabilities, setCapabilities] = useState<AuthenticatorCapabilities | null>(null)
  const pendingResolve = useRef<((loggedIn: boolean) => void) | null>(null)

  useEffect(() => {
    getAuthenticatorCapabilities().then(setCapabilities)
  }, [])

  const settle = (loggedIn: boolean) => {
    pendingResolve.current?.(loggedIn)
    pendingResolve.current = null
  }

  // On iOS, offer the Home Screen before a wallet is created in the browser
  const openRegistration = async (): Promise<boolean> => {
    const result = new Promise<boolean>(resolve => {
      pendingResolve.current = resolve
    })
    if (await hasIOSEvictionRisk()) {
      setShowHomeScreenChoice(true)
    } else {
      setIsRegistrationOpen(true)
    }
    return result
  }

  /**
   * Login Workflow:
   * 1. Existing persistent sessions are restored by the W3PK context on mount
   * 2. If no passkey was ever registered on this device, open the
   *    registration modal directly — calling login() with no local
   *    credential would make the browser show its cross-device
   *    "scan this QR code" dialog instead of failing
   * 3. Otherwise login() prompts for the passkey; if it turns out to be
   *    unavailable after all, fall back to the registration modal
   */
  const startLogin = async (): Promise<boolean> => {
    settle(false)
    try {
      if (!(await hasLocalCredentials())) {
        return await openRegistration()
      }
      await login()
      return true
    } catch (error) {
      if (isNoPasskeyError(error)) {
        toaster.create({
          title: t.header.noAccountFoundTitle,
          description: t.header.noAccountFoundDescription,
          type: 'info',
          duration: 4000,
        })
        return await openRegistration()
      }
      // Other errors (user cancelled, timeout, etc.) are already handled
      // by the login() function in the W3PK context
      return false
    }
  }

  const authenticatorHint = capabilities && getAuthenticatorHint(capabilities)
  const isWebAuthnUnsupported = capabilities?.tier === 'unsupported'

  const handleRegister = async () => {
    if (isWebAuthnUnsupported) return

    if (!username.trim()) {
      toaster.create({
        title: t.header.usernameRequiredTitle,
        description: t.header.usernameRequiredDescription,
        type: 'warning',
        duration: 3000,
      })
      setIsUsernameInvalid(true)
      return
    }

    if (!validateUsername(username)) {
      setIsUsernameInvalid(true)
      return
    }

    setIsUsernameInvalid(false)

    try {
      setIsRegistering(true)
      // register() handles its own timeout and error/success toasts
      await register(username.trim())
      setUsername('')
      setIsRegistrationOpen(false)
      settle(true)
    } catch (error) {
      console.error('[LoginFlow] Registration failed:', error)
    } finally {
      setIsRegistering(false)
    }
  }

  const handleUsernameChange = (value: string) => {
    setUsername(value)
    if (validateUsername(value)) {
      setIsUsernameInvalid(false)
    }
  }

  const handleModalClose = () => {
    setUsername('')
    setIsUsernameInvalid(false)
    setIsRegistrationOpen(false)
    settle(false)
  }

  return (
    <LoginFlowContext.Provider value={{ startLogin }}>
      {children}

      <Dialog.Root
        open={isRegistrationOpen}
        onOpenChange={(e: { open: boolean }) => (e.open ? null : handleModalClose())}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content p={6}>
              <Dialog.Header>
                <Dialog.Title>{t.header.registerTitle}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pt={4}>
                <VStack gap={4}>
                  <Text fontSize="sm" color="gray.400">
                    {t.header.walletInfoText}{' '}
                    <ChakraLink
                      href={'https://github.com/w3hc/w3pk/blob/main/src/auth/register.ts#L17-L102'}
                      color={brandColors.accent}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      w3pk
                    </ChakraLink>
                    .
                  </Text>
                  {authenticatorHint && (
                    <Text
                      fontSize="sm"
                      color={isWebAuthnUnsupported ? 'red.300' : 'gray.300'}
                      alignSelf="flex-start"
                      role={isWebAuthnUnsupported ? 'alert' : undefined}
                    >
                      {t.header[authenticatorHint]}
                    </Text>
                  )}
                  {capabilities?.prf === false && (
                    <Text fontSize="sm" color="yellow.300" alignSelf="flex-start">
                      {t.header.prfUnsupportedWarning}
                    </Text>
                  )}
                  <Field invalid={isUsernameInvalid} label={t.header.usernameLabel}>
                    <Input
                      id="username-input"
                      aria-describedby={
                        isUsernameInvalid && username.trim() ? 'username-error' : undefined
                      }
                      aria-invalid={isUsernameInvalid && username.trim() ? true : undefined}
                      value={username}
                      onChange={e => handleUsernameChange(e.target.value)}
                      placeholder={t.header.usernamePlaceholder}
                      pl={3}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && username.trim()) {
                          handleRegister()
                        }
                      }}
                    />
                    {isUsernameInvalid && username.trim() && (
                      <Field.ErrorText id="username-error">
                        {t.header.usernameError}
                      </Field.ErrorText>
                    )}
                  </Field>{' '}
                  <ChakraLink
                    as={Link}
                    href="/settings#sync-import"
                    onClick={handleModalClose}
                    fontSize="sm"
                    color={brandColors.accent}
                    alignSelf="flex-start"
                  >
                    {t.header.alreadyRegisteredLink}
                  </ChakraLink>
                </VStack>
              </Dialog.Body>

              <Dialog.Footer gap={3} pt={6}>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">{t.common.cancel}</Button>
                </Dialog.ActionTrigger>
                <Button
                  colorPalette="blue"
                  onClick={handleRegister}
                  disabled={!username.trim() || isWebAuthnUnsupported}
                >
                  {isRegistering && <Spinner size="50px" />}
                  {!isRegistering && t.header.createAccount}
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      <HomeScreenChoice
        isOpen={showHomeScreenChoice}
        onClose={() => {
          setShowHomeScreenChoice(false)
          settle(false)
        }}
        onBackup={() => {
          setShowHomeScreenChoice(false)
          setIsRegistrationOpen(true)
        }}
      />
    </LoginFlowContext.Provider>
  )
}
