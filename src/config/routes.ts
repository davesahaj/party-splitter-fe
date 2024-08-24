import { ROUTES } from '@/constants'
import { AddExpense, Home, PageNotFound, UploadBill } from '@/pages'

export const publicRoutes: {
  path: string
  component: () => JSX.Element
}[] = [
  {
    path: ROUTES.HOME,
    component: Home,
  },
  {
    path: ROUTES.NEW_EXPENSE,
    component: AddExpense,
  },
  {
    path: ROUTES.UPLOAD_BILL,
    component: UploadBill,
  },
  {
    path: '',
    component: PageNotFound,
  },
]
