import { useCallback } from 'react'
import { useForm } from '@mantine/form'

import { Button, Text, TextInput } from '@/components/ui/core'
import { ROUTES } from '@/constants'
import { NativeFlex, NativeGroup, NativeScrollArea, randomId, useLocation, useViewportSize } from '@/libs'

export const ReviewBill = () => {
  const [, setLocation] = useLocation()

  const { height } = useViewportSize()

  const form = useForm({
    mode: 'uncontrolled',

    initialValues: {
      items: [
        { name: 'Ravioli', price: 10, key: randomId() },
        { name: 'Ravioli', price: 10, key: randomId() },
        { name: 'Ravioli', price: 10, key: randomId() },
      ],
    },
  })

  const handleSubmit = useCallback(() => {
    if (!form.validate().hasErrors) setLocation(ROUTES.ADD_PARTICIPANTS)
  }, [form])

  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div className="flex flex-col space-y-10 ">
        <Text fw={500} c="dark.4" classNames={{ root: 'text-xl text-center' }}>
          Review Bill details
        </Text>

        <NativeScrollArea.Autosize offsetScrollbars mah={height - 350} type="auto">
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
        </NativeScrollArea.Autosize>
      </div>

      <NativeGroup>
        <NativeFlex w="100%" justify="space-between">
          <Text fz="xl">Total:</Text>
          <Text fz="xl">{10}</Text>
        </NativeFlex>
        <Button fullWidth size="lg" onClick={handleSubmit}>
          Next (3/5)
        </Button>
      </NativeGroup>
    </div>
  )
}
