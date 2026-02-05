'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import { Box } from '@chakra-ui/react'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Check if we're on an adventure page (matches /[id] pattern)
  const isAdventurePage =
    pathname !== '/' && !pathname.startsWith('/api') && pathname.split('/').length === 2

  return (
    <>
      {!isAdventurePage && <Header />}
      <Box pt={isAdventurePage ? 0 : '72px'}>{children}</Box>
    </>
  )
}
