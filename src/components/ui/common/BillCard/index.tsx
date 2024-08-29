import { Text } from '@/components/ui/core'
import { formatRelative, NativeCard } from '@/libs'
import { BillCardType } from '@/types'

export const BillCard = (props: BillCardType) => {
  return (
    <NativeCard component="a" href="#" shadow="sm" padding="lg" radius="md" withBorder classNames={{ root: 'gap-y-2' }}>
      <Text c="violet" fw={900} classNames={{ root: 'text-2xl xl:w-72' }}>
        {props.venue}
      </Text>
      <div className="flex justify-between">
        <Text>{formatRelative(props.date, new Date())}</Text>
        <Text c="violet.9" fw={500} classNames={{ root: 'text-xl' }}>
          {`₹${props.cost}`}
        </Text>
      </div>
      <Text c="gray.7">{props.people}</Text>
    </NativeCard>
  )
}
