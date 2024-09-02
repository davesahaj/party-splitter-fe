import { ROUTES } from '@/constants'
import { AddExpense, AddParticipants, Home, PageNotFound, Report, ReviewBill, UploadBill } from '@/pages'

export const publicRoutes: {
  path: string
  component: () => React.ReactNode
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
    path: ROUTES.ADD_PARTICIPANTS,
    component: AddParticipants,
  },
  {
    path: ROUTES.VIEW_REPORT,
    component: Report,
  },
  {
    path: ROUTES.REVIEW_BILL,
    component: ReviewBill,
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
