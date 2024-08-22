import { RouterProvider, ThemeProvider } from '@/providers'

function App() {
  return (
    <>
      <ThemeProvider>
        <RouterProvider />
      </ThemeProvider>
    </>
  )
}

export default App
