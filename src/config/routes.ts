import { ROUTES } from '@/constants'
import { Home, PageNotFound } from '@/pages'

export const publicRoutes: {
  path: string
  component: () => JSX.Element
}[] = [
  {
    path: ROUTES.HOME,
    component: Home,
  },
  {
    path: '',
    component: PageNotFound,
  },
]
