import { forwardRef } from 'react'

import { NativeTextInput, NativeTextInputProps } from '@/libs'

// Define the ref type for TextInput
type TextInputRef = HTMLInputElement

// Update the TextInputProps to include the ref type
interface TextInputProps extends NativeTextInputProps {}

export const TextInput = forwardRef<TextInputRef, TextInputProps>(function TextInput(props, ref) {
  return <NativeTextInput {...props} ref={ref} />
})
