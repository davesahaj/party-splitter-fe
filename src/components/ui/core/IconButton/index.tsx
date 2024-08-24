import { NativeActionIcon, NativeActionIconProps } from '@/libs'

interface ActionIconProps extends NativeActionIconProps {}

export function IconButton(props: ActionIconProps) {
  return <NativeActionIcon {...props} />
}
