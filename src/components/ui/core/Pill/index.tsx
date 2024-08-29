import { NativePill, NativePillProps } from '@/libs'

interface PillProps extends NativePillProps {}

export function Pill(props: PillProps) {
  return <NativePill c="violet" variant="contrast" withRemoveButton size="lg" {...props} />
}
