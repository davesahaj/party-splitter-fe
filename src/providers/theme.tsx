import { MantineProvider } from '@mantine/core'

import '@mantine/core/styles.css'

type Props = {
  children: JSX.Element
}

export function ThemeProvider(props: Props) {
  return <MantineProvider>{props.children}</MantineProvider>
}
