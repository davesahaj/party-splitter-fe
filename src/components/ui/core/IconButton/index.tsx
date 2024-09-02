import { NativeActionIcon, NativeActionIconProps } from '@/libs'

interface ActionIconProps extends NativeActionIconProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export function IconButton(props: ActionIconProps) {
  return <NativeActionIcon {...props} onClick={props.onClick} />
}
