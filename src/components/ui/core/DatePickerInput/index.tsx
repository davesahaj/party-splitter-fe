import { NativeDateInput, NativeDateInputProps } from '@/libs'

interface DateInputProps extends NativeDateInputProps {}

export function DateInput({ ...props }: DateInputProps) {
  return <NativeDateInput {...props} />
}
