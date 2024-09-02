import { createTheme, MantineProvider } from '@mantine/core'

import { MainLayout } from '@/components/layout'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/notifications/styles.css'

type Props = {
  children: React.ReactNode
}
const theme = createTheme({
  primaryColor: 'violet',
})

export function ThemeProvider(props: Props) {
  return (
    <MantineProvider theme={theme}>
      <MainLayout>{props.children}</MainLayout>
    </MantineProvider>
  )
}
