import { NativeTextInput, NativeTextInputProps } from '@/libs'

interface TextInputProps extends NativeTextInputProps {}

export function TextInput(props: TextInputProps) {
  return <NativeTextInput {...props} />
}
