import { useCallback } from 'react'
import { useForm } from '@mantine/form'

import { IconPlus } from '@/components/icons'
import { Button, DateInput, IconButton, Pill, Text, TextInput } from '@/components/ui/core'
import { ROUTES } from '@/constants'
import { dateFormat, NativeGroup, NativeScrollArea, useLocation } from '@/libs'

export const AddExpense = () => {
  const [, setLocation] = useLocation()

  const form = useForm({
    mode: 'uncontrolled',

    initialValues: { location: '', date: '' },
    validate: {
      location: (value) => (!value.length ? 'Location can not be empty' : null),
      date: (value: Date | string) => (value instanceof Date ? null : 'Date can not be empty'),
    },
  })

  const handleSubmit = useCallback(() => {
    if (!form.validate().hasErrors) setLocation(ROUTES.UPLOAD_BILL)
  }, [form])

  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div className="flex flex-col space-y-10 ">
        <Text fw={500} c="dark.4" classNames={{ root: 'text-xl text-center' }}>
          Add new Expense
        </Text>

        <form className="space-y-6" onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            size="lg"
            radius="md"
            withAsterisk
            label="Location"
            placeholder="Lazy Suzy"
            key={form.key('location')}
            {...form.getInputProps('location')}
          />
          <DateInput
            withAsterisk
            size="lg"
            radius="md"
            label="Date"
            placeholder={dateFormat(new Date(), 'MMMM d, yyyy')}
            key={form.key('date')}
            {...form.getInputProps('date')}
          />
          <NativeGroup justify="space-between" align="flex-end" wrap="nowrap" gap="sm">
            <TextInput size="lg" radius="md" label="Participants" placeholder="Saksham" />
            <IconButton size="xl" mb={5} radius="xl" variant="light">
              <IconPlus />
            </IconButton>
          </NativeGroup>

          <NativeScrollArea.Autosize offsetScrollbars mah={180} type="auto">
            <div className="flex gap-2 flex-wrap">
              <Pill>Akshay</Pill>
              <Pill>Shivansh</Pill>
              <Pill>Tanya</Pill>
            </div>
          </NativeScrollArea.Autosize>
        </form>
      </div>
      <Button fullWidth size="lg" onClick={handleSubmit}>
        Next
      </Button>
    </div>
  )
}
