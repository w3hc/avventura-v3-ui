'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import { Box } from '@chakra-ui/react'

const APP_ROUTES = new Set(['/', '/edit', '/dashboard', '/settings'])

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Check if we're on an adventure page (matches /[id] pattern)
  const isAdventurePage =
    !APP_ROUTES.has(pathname) && !pathname.startsWith('/api') && pathname.split('/').length === 2

  return (
    <>
      {!isAdventurePage && <Header />}
      <Box pt={isAdventurePage ? 0 : '72px'}>{children}</Box>
    </>
  )
}
