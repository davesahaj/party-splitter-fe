import { Text } from '@/components/ui/core'

export const Header = () => {
  return (
    <Text
      classNames={{ root: 'select-none text-4xl text-center' }}
      fw={900}
      variant="gradient"
      gradient={{ from: 'indigo', to: 'grape', deg: 330 }}
    >
      Party Splitter
    </Text>
  )
}
