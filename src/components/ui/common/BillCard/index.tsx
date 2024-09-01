import { IconTrash } from '@tabler/icons-react'

import { IconButton, Text } from '@/components/ui/core'
import { dateFormat, NativeCard, NativeFlex } from '@/libs'
import { BillCardType } from '@/types'

export const BillCard = (props: BillCardType) => {
  return (
    <NativeCard component="a" href="#" shadow="sm" padding="lg" radius="md" withBorder classNames={{ root: 'gap-y-3' }}>
      <NativeFlex justify="space-between">
        <Text c="violet" fw={900} classNames={{ root: 'text-2xl xl:w-72' }}>
          {props.venue}
        </Text>
        <IconButton variant="light">
          <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </IconButton>
      </NativeFlex>
      <div className="flex justify-between">
        <Text>{dateFormat(new Date(), 'PPP')}</Text>
        <Text c="violet.9" fw={600} classNames={{ root: 'text-xl' }}>
          {`₹${props.cost}`}
        </Text>
      </div>
      <Text c="gray.7">{props.people} participants</Text>
    </NativeCard>
  )
}
