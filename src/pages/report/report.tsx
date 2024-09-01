import { Button, Text } from '@/components/ui/core'
import { ROUTES } from '@/constants'
import { NativeFlex, NativeGroup, NativeScrollArea, useLocation, useViewportSize } from '@/libs'

export const Report = () => {
  const [, setLocation] = useLocation()
  const { height } = useViewportSize()

  const handleSubmit = () => setLocation(ROUTES.HOME)

  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div className="flex flex-col space-y-10 ">
        <Text fw={500} c="dark.4" classNames={{ root: 'text-xl text-center' }}>
          Split Report
        </Text>
        <NativeScrollArea.Autosize offsetScrollbars mah={height - 350} type="auto">
          <NativeGroup>
            <NativeFlex justify="space-between" w="100%">
              <Text fz="lg">Muskan</Text>
              <Text fz="lg">540</Text>
            </NativeFlex>
          </NativeGroup>
        </NativeScrollArea.Autosize>
      </div>
      <Button onClick={handleSubmit} fullWidth size="lg">
        Save
      </Button>
    </div>
  )
}
