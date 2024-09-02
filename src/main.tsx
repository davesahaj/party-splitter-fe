import React from 'react'
import ReactDOM from 'react-dom/client'

import { NotificationProvider, RouterProvider, ThemeProvider } from '@/providers'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <NotificationProvider />
      <RouterProvider />
    </ThemeProvider>
  </React.StrictMode>,
)
