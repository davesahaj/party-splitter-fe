/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from '@mantine/form'

import { PageLayout } from '@/components/layout'
import { Text } from '@/components/ui/core'
import { ROUTES } from '@/constants'
import { useStore } from '@/hooks'
import { NativeGroup, NativeMultiSelect, NativeScrollArea, useLocation } from '@/libs'
import { BillItem } from '@/types'

export const AddParticipants = () => {
  const state = useStore((state: any) => state)
  const updateForm = useStore((state: any) => state.updateForm)

  const [, setLocation] = useLocation()

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
    <PageLayout buttonProps={{ onClick: handleSubmit, text: 'Next (4/5)' }}>
      <div className="flex flex-col space-y-10 ">
        <Text fw={500} c="dark.4" classNames={{ root: 'text-xl text-center font-urbanist' }}>
          Add Participants
        </Text>
        <NativeScrollArea.Autosize offsetScrollbars type="auto">
          <NativeGroup gap="xl">
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
    </PageLayout>
  )
}
