import { NativeButton, NativeButtonProps } from '@/libs'

interface ButtonProps extends NativeButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export function Button(props: ButtonProps) {
  return <NativeButton {...props} onClick={props.onClick} />
}
