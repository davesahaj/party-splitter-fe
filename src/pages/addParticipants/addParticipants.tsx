import { Button, Text } from '@/components/ui/core'

export const AddParticipants = () => {
  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div className="flex flex-col space-y-10 ">
        <Text fw={500} c="dark.4" classNames={{ root: 'text-xl text-center' }}>
          Add bill details
        </Text>
      </div>
      <Button fullWidth size="lg">
        Next
      </Button>
    </div>
  )
}
