import { useCallback, useState } from 'react'
import { useForm } from '@mantine/form'

import { IconEdit } from '@/components/icons'
import { Button, Text, TextInput } from '@/components/ui/core'
import { ROUTES } from '@/constants'
import { NativeFlex, NativeGroup, randomId, useLocation } from '@/libs'

export const ReviewBill = () => {
  const [, setLocation] = useLocation()

  const form = useForm({
    mode: 'uncontrolled',

    initialValues: {
      items: [
        { name: 'Ravioli', price: 10, key: randomId() },
        { name: 'Ravioli', price: 10, key: randomId() },
      ],
    },
  })

  const handleSubmit = useCallback(() => {
    if (!form.validate().hasErrors) setLocation(ROUTES.UPLOAD_BILL)
  }, [form])

  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div className="flex flex-col space-y-10 ">
        <Text fw={500} c="dark.4" classNames={{ root: 'text-xl text-center' }}>
          Review Bill details
        </Text>

        <form className="space-y-6" onSubmit={form.onSubmit((values) => console.log(values))}>
          {form.getValues().items.map((item, index) => (
            <NativeFlex key={item.key} justify="space-between" align="center">
              <TextInput
                size="md"
                radius="md"
                withAsterisk
                key={form.key(`items.${index}.name`)}
                {...form.getInputProps(`items.${index}.name`)}
              />
              <TextInput
                className="w-20"
                size="md"
                radius="md"
                key={form.key(`items.${index}.price`)}
                {...form.getInputProps(`items.${index}.price`)}
              />
            </NativeFlex>
          ))}
        </form>
      </div>

      <Button fullWidth size="lg" onClick={handleSubmit}>
        Next
      </Button>
    </div>
  )
}
