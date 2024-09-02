import { IconToolsKitchen2 } from '@/components/icons'
import { PageLayout } from '@/components/layout'
import { BillCard } from '@/components/ui/common'
import { Text } from '@/components/ui/core'
import { ROUTES } from '@/constants'
import { useLocation } from '@/libs'
import { Report } from '@/types'
import { storageReader } from '@/utils'

export const Home = () => {
  const [, setLocation] = useLocation()
  const reports: Report[] = storageReader('localStorage', 'reports')

  const handleSubmit = () => {
    setLocation(ROUTES.UPLOAD_BILL)
  }

  return (
    <PageLayout buttonProps={{ onClick: handleSubmit, text: '  Add Expense' }}>
      <div className="flex flex-col xl:flex-row gap-y-4 xl:gap-4">
        {Array.isArray(reports) ? (
          reports.map(({ venue, date, total, participants }) => (
            <BillCard key={venue} venue={venue} cost={total} date={date} people={participants.length} />
          ))
        ) : (
          <div className="flex flex-col gap-y-6 w-2/3 mx-auto mt-12 justify-center bg-slate-200 items-center rounded-full aspect-square">
            <IconToolsKitchen2 className="h-auto w-1/3 stroke-[1] text-slate-400" />
            <Text fw={400} c="gray.6">
              No reports yet
            </Text>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
