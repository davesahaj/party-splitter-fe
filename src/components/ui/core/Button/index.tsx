import { NativeButton, NativeButtonProps } from '@/libs'

interface ButtonProps extends NativeButtonProps {}

export function Button(props: ButtonProps) {
  return <NativeButton {...props} />
}
