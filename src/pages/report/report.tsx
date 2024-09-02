/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react'

import { PageLayout } from '@/components/layout'
import { Text } from '@/components/ui/core'
import { ROUTES } from '@/constants'
import { useStore } from '@/hooks'
import { NativeFlex, NativeGroup, NativeScrollArea, useLocation, useViewportSize } from '@/libs'
import { BillItem } from '@/types'

export const Report = () => {
  const { height } = useViewportSize()
  const state = useStore((state: any) => state)

  const [, setLocation] = useLocation()

  const handleSubmit = () => {
    state.saveAndReset()

    setLocation(ROUTES.HOME)
  }

  const participants = useMemo(() => {
    const dishes: BillItem[] = state.items
    const consumersMap: {
      [key: string]: number
    } = {}

    dishes.forEach(({ price, qty, consumers }) => {
      const avgPrice = (qty * price) / (consumers?.length || 1)

      consumers?.forEach((consumer) => {
        if (!consumersMap[consumer]) consumersMap[consumer] = avgPrice
        else consumersMap[consumer] = consumersMap[consumer] + avgPrice
      })
    })

    const participantsArray = Object.entries(consumersMap).map(([consumer, totalCost]) => ({
      consumer,
      totalCost,
    }))

    return participantsArray
  }, [state])

  return (
    <PageLayout buttonProps={{ onClick: handleSubmit, text: 'Save Report' }}>
      <div className="flex flex-col space-y-10 ">
        <Text fw={500} c="dark.4" classNames={{ root: 'text-xl text-center font-urbanist' }}>
          Split Report
        </Text>
        <NativeScrollArea.Autosize offsetScrollbars mah={height - 350} type="auto">
          <NativeGroup>
            {participants.map(({ consumer, totalCost }) => (
              <NativeFlex key={consumer} justify="space-between" w="100%">
                <Text className="capitalize " fw={600} c="violet.7" fz="lg">
                  {consumer}
                </Text>
                <Text className="font-urbanist" fw={500} fz="lg">
                  ₹{+totalCost.toPrecision(5)}
                </Text>
              </NativeFlex>
            ))}
          </NativeGroup>
        </NativeScrollArea.Autosize>
      </div>
    </PageLayout>
  )
}
