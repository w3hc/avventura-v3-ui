'use client'

import { Checkbox as ChakraCheckbox } from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface CheckboxProps extends ChakraCheckbox.RootProps {
  children?: React.ReactNode
}

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(function Checkbox(props, ref) {
  const { children, ...rest } = props
  return (
    <ChakraCheckbox.Root ref={ref} {...rest}>
      <ChakraCheckbox.HiddenInput />
      <ChakraCheckbox.Control>
        <ChakraCheckbox.Indicator />
      </ChakraCheckbox.Control>
      {children != null && <ChakraCheckbox.Label>{children}</ChakraCheckbox.Label>}
    </ChakraCheckbox.Root>
  )
})
