import { useCallback, useRef } from 'react'
import { useForm } from '@mantine/form'

import { IconPlus } from '@/components/icons'
import { Button, DateInput, IconButton, Pill, Text, TextInput } from '@/components/ui/core'
import { ROUTES } from '@/constants'
import { dateFormat, NativeGroup, NativeScrollArea, useLocation } from '@/libs'

const initialValues: {
  location: string
  date: string
  participants: string[]
} = { location: '', date: '', participants: [] }

export const AddExpense = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [, setLocation] = useLocation()

  const form = useForm({
    mode: 'uncontrolled',

    initialValues,
    validate: {
      location: (value) => (!value.length ? 'Location can not be empty' : null),
      date: (value: Date | string) => (value instanceof Date ? null : 'Date can not be empty'),
    },
  })

  const handleSubmit = useCallback(() => {
    if (!form.validate().hasErrors) setLocation(ROUTES.UPLOAD_BILL)
  }, [form])

  const addParticipant = useCallback(() => {
    const val = inputRef?.current?.value

    if (!val) return

    form.setFieldValue('participants', (prev) => {
      return [...prev, val]
    })

    inputRef.current.value = ''
  }, [form])

  const removeParticipant = useCallback(
    (val: string) => {
      const currentParticipants = form.getValues().participants

      form.setFieldValue(
        'participants',
        currentParticipants.filter((participant) => participant !== val),
      )
    },
    [form],
  )

  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div className="flex flex-col space-y-10 ">
        <Text fw={500} c="dark.4" classNames={{ root: 'text-xl text-center font-urbanist' }}>
          Add new Expense
        </Text>

        <form className="space-y-6" onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            size="md"
            radius="md"
            label="Location"
            placeholder="Lazy Suzy"
            key={form.key('location')}
            {...form.getInputProps('location')}
          />
          <DateInput
            maxDate={new Date()}
            size="md"
            radius="md"
            label="Date"
            placeholder={dateFormat(new Date(), 'MMMM d, yyyy')}
            key={form.key('date')}
            {...form.getInputProps('date')}
          />
          <NativeGroup justify="space-between" align="flex-end" wrap="nowrap" gap="sm">
            <TextInput ref={inputRef} size="md" radius="md" label="Participants" placeholder="Saksham" />
            <IconButton size="xl" mb={2} radius="xl" variant="light">
              <IconPlus onClick={addParticipant} />
            </IconButton>
          </NativeGroup>

          <NativeScrollArea.Autosize offsetScrollbars mah={180} type="auto">
            <div className="flex gap-2 flex-wrap">
              {form.getValues().participants.map((item) => (
                <Pill onRemove={() => removeParticipant(item)} key={item}>
                  {item}
                </Pill>
              ))}
            </div>
          </NativeScrollArea.Autosize>
        </form>
      </div>
      <Button fullWidth size="lg" onClick={handleSubmit}>
        Next (1/5)
      </Button>
    </div>
  )
}
