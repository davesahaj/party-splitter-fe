import { MantineProvider } from '@mantine/core'

import { MainLayout } from '@/components/layout'

import '@mantine/core/styles.css'

type Props = {
  children: JSX.Element
}

export function ThemeProvider(props: Props) {
  return (
    <MantineProvider>
      <MainLayout>{props.children}</MainLayout>
    </MantineProvider>
  )
}
