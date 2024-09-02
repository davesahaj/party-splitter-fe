/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from '@mantine/form'

import { Button, Text } from '@/components/ui/core'
import { ROUTES } from '@/constants'
import { useStore } from '@/hooks'
import { NativeGroup, NativeMultiSelect, NativeScrollArea, useLocation, useViewportSize } from '@/libs'
import { BillItem } from '@/types'

export const AddParticipants = () => {
  const state = useStore((state: any) => state)
  const updateForm = useStore((state: any) => state.updateForm)

  const [, setLocation] = useLocation()
  const { height } = useViewportSize()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      items: state.items.map((item: BillItem) => ({ consumers: [], ...item })),
    },
  })

  const handleOnChange = (value: any, idx: number) => {
    form.setFieldValue(`items.${idx}.consumers`, value)
  }

  const handleSubmit = () => {
    updateForm(form.getValues())
    setLocation(ROUTES.VIEW_REPORT)
  }

  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div className="flex flex-col space-y-10 ">
        <Text fw={500} c="dark.4" classNames={{ root: 'text-xl text-center' }}>
          Add Participants
        </Text>
        <NativeScrollArea.Autosize offsetScrollbars mah={height - 350} type="auto">
          <NativeGroup>
            {form.getValues().items.map(({ name }: BillItem, idx: number) => (
              <NativeMultiSelect
                onChange={(val) => handleOnChange(val, idx)}
                key={name}
                w="100%"
                label={name}
                placeholder="Pick Participants"
                data={state.participants}
              />
            ))}
          </NativeGroup>
        </NativeScrollArea.Autosize>
      </div>
      <Button onClick={handleSubmit} fullWidth size="lg">
        Next (4/5)
      </Button>
    </div>
  )
}
