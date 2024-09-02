//@ts-nocheck
import { NativeDatePickerInput, NativeDatePickerInputProps } from '@/libs'

interface DateInputProps extends NativeDatePickerInputProps {}

export function DateInput({ ...props }: DateInputProps) {
  return <NativeDatePickerInput {...props} />
}
