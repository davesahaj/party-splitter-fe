/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react'
import { useForm } from '@mantine/form'
import { isEqual } from 'lodash'

import { PageLayout } from '@/components/layout'
import { NumberInput, Text, TextInput } from '@/components/ui/core'
import { ROUTES } from '@/constants'
import { useStore } from '@/hooks'
import { NativeFieldset, NativeFlex, NativeGroup, NativeScrollArea, useLocation } from '@/libs'
import { BillItem } from '@/types'

export const ReviewBill = () => {
  const state = useStore((state: any) => state)
  const updateForm = useStore((state: any) => state.updateForm)

  const [, setLocation] = useLocation()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      items: state.items,
      taxes: state.taxes,
      total: state.total,
      discount: state.discount,
    },
    onValuesChange: (values, previous) => {
      if (isEqual(values, previous)) return

      form.setFieldValue('total', getTotal())
    },
  })

  const handleSubmit = useCallback(() => {
    form.setFieldValue('total', getTotal())

    if (!form.validate().hasErrors) {
      updateForm(form.getValues())
      setLocation(ROUTES.ADD_PARTICIPANTS)
    }
  }, [form, setLocation])

  const getTotal = () =>
    form.getValues().taxes +
    form.getValues().items.reduce((acc: number, { price, qty }: BillItem) => acc + price * qty, 0)

  return (
    <PageLayout buttonProps={{ text: 'Next (3/5)', onClick: handleSubmit }}>
      <div className="flex flex-col space-y-10">
        <Text fw={500} c="dark.4" classNames={{ root: 'text-xl text-center font-urbanist' }}>
          Review Bill details
        </Text>

        <NativeScrollArea.Autosize offsetScrollbars type="auto">
          <form className="space-y-6">
            {form.getValues().items.map(({ name, price, qty }: BillItem, index: number) => (
              <NativeFieldset key={name} legend={`Item ${index + 1}`} radius="md" classNames={{ root: 'bg-slate-50' }}>
                <NativeFlex justify="space-between" mt="md">
                  <TextInput
                    size="md"
                    radius="md"
                    w="100%"
                    label="Name"
                    placeholder="quattro formaggi"
                    key={form.key(`items.${index}.name`)}
                    defaultValue={form.getInputProps(`items.${index}.name`).defaultValue}
                  />
                </NativeFlex>

                <NativeFlex justify="space-between" mt="md">
                  <NumberInput
                    w="45%"
                    prefix="₹"
                    size="md"
                    label="Price"
                    min={0}
                    radius="md"
                    key={form.key(`items.${index}.price`)}
                    {...form.getInputProps(`items.${index}.price`)}
                  />
                  <NumberInput
                    w="45%"
                    size="md"
                    radius="md"
                    min={0}
                    max={100}
                    clampBehavior="strict"
                    label="Qty"
                    key={form.key(`items.${index}.qty`)}
                    {...form.getInputProps(`items.${index}.qty`)}
                  />
                </NativeFlex>

                <NativeFlex justify="space-between" mt="md">
                  <NumberInput
                    size="md"
                    min={0}
                    radius="md"
                    prefix="₹"
                    disabled
                    value={price * qty}
                    label="Total Amount"
                    w="100%"
                  />
                </NativeFlex>
              </NativeFieldset>
            ))}

            <NativeGroup>
              <NativeFlex w="100%" justify="space-between">
                <Text fz="xl">Discount:</Text>
                <Text fz="xl">{state.discount}</Text>
              </NativeFlex>
              <NativeFlex w="100%" justify="space-between">
                <Text fz="xl">Taxes:</Text>
                <Text fz="xl">{state.taxes}</Text>
              </NativeFlex>
              <NativeFlex w="100%" justify="space-between">
                <Text fz="xl">Total:</Text>
                <Text fz="xl">{getTotal()}</Text>
              </NativeFlex>
            </NativeGroup>
          </form>
        </NativeScrollArea.Autosize>
      </div>
    </PageLayout>
  )
}
