import { forwardRef } from 'react'

import { NativeNumberInput, NativeNumberInputProps } from '@/libs'

type NumberInputRef = HTMLInputElement

interface NumberInputProps extends NativeNumberInputProps {}

export const NumberInput = forwardRef<NumberInputRef, NumberInputProps>(function NumberInput(props, ref) {
  return <NativeNumberInput {...props} ref={ref} />
})
