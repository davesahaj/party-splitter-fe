import { useCallback, useRef } from 'react'
import { useForm } from '@mantine/form'

import { IconCalendarEvent, IconMapPin, IconPlus, IconUsers } from '@/components/icons'
import { PageLayout } from '@/components/layout'
import { DateInput, IconButton, Pill, Text, TextInput } from '@/components/ui/core'
import { ROUTES } from '@/constants'
import { useStore } from '@/hooks'
import { dateFormat, getHotkeyHandler, NativeGroup, NativeScrollArea, useLocation } from '@/libs'

const initialValues: {
  location: string
  date: Date | null
  participants: string[]
} = { location: '', date: null, participants: [] }

export const AddExpense = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [, setLocation] = useLocation()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateForm = useStore((state: any) => state.updateForm)

  const form = useForm({
    mode: 'uncontrolled',

    initialValues,
    validate: {
      location: (value) => (!value.length ? 'Location can not be empty' : null),
      date: (value: Date | null) => (value instanceof Date ? null : 'Date can not be empty'),
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const handleSubmit = () => {
    if (!form.validate().hasErrors) {
      const { date, location, participants } = form.getValues()

      updateForm({ date, venue: location, participants })

      setLocation(ROUTES.UPLOAD_BILL)
    }
  }

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
    <PageLayout buttonProps={{ onClick: handleSubmit, text: 'Next' }}>
      <Text fw={500} c="dark.4" classNames={{ root: 'text-xl text-center font-urbanist' }}>
        Add new Expense
      </Text>

      <form className="space-y-6">
        <TextInput
          size="md"
          radius="md"
          label="Location"
          leftSectionPointerEvents="none"
          leftSection={<IconMapPin style={{ width: 18, height: 18 }} />}
          placeholder="Lazy Suzy"
          key={form.key('location')}
          {...form.getInputProps('location')}
        />
        <DateInput
          maxDate={new Date()}
          size="md"
          radius="md"
          label="Date"
          dropdownType="modal"
          leftSectionPointerEvents="none"
          leftSection={<IconCalendarEvent style={{ width: 18, height: 18 }} />}
          placeholder={dateFormat(new Date(), 'MMMM d, yyyy')}
          key={form.key('date')}
          {...form.getInputProps('date')}
        />
        <NativeGroup justify="space-between" align="flex-end" wrap="nowrap" gap="sm">
          <TextInput
            ref={inputRef}
            size="md"
            radius="md"
            leftSectionPointerEvents="none"
            leftSection={<IconUsers style={{ width: 18, height: 18 }} />}
            label="Participants"
            placeholder="Saksham"
            className="lg:w-full"
            onKeyDown={getHotkeyHandler([['Enter', addParticipant]])}
          />
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
    </PageLayout>
  )
}
