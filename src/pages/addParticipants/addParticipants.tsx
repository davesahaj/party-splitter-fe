import { Button, Text } from '@/components/ui/core'
import { ROUTES } from '@/constants'
import { NativeGroup, NativeMultiSelect, NativeScrollArea, useLocation, useViewportSize } from '@/libs'

export const AddParticipants = () => {
  const [, setLocation] = useLocation()
  const { height } = useViewportSize()

  const handleSubmit = () => setLocation(ROUTES.VIEW_REPORT)

  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div className="flex flex-col space-y-10 ">
        <Text fw={500} c="dark.4" classNames={{ root: 'text-xl text-center' }}>
          Add Participants
        </Text>
        <NativeScrollArea.Autosize offsetScrollbars mah={height - 350} type="auto">
          <NativeGroup>
            <NativeMultiSelect
              w="100%"
              label="Ravioli with mushrooms"
              placeholder="Pick Participants"
              data={['React', 'Angular', 'Vue', 'Svelte']}
            />{' '}
            <NativeMultiSelect
              w="100%"
              label="Ravioli with mushrooms"
              placeholder="Pick Participants"
              data={['React', 'Angular', 'Vue', 'Svelte']}
            />{' '}
            <NativeMultiSelect
              w="100%"
              label="Ravioli with mushrooms"
              placeholder="Pick Participants"
              data={['React', 'Angular', 'Vue', 'Svelte']}
            />
          </NativeGroup>
        </NativeScrollArea.Autosize>
      </div>
      <Button onClick={handleSubmit} fullWidth size="lg">
        Next (4/5)
      </Button>
    </div>
  )
}
