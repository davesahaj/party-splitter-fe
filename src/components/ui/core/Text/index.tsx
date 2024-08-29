import { NativeText, NativeTextProps } from '@/libs'

interface TextProps extends NativeTextProps {
  children: string | number
}

export function Text(props: TextProps) {
  return <NativeText {...props}>{props.children}</NativeText>
}
