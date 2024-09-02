import { IconToolsKitchen2 } from '@/components/icons'
import { PageLayout } from '@/components/layout'
import { BillCard } from '@/components/ui/common'
import { Text } from '@/components/ui/core'
import { ROUTES } from '@/constants'
import { HOME_EMPTY_MSG } from '@/constants'
import { useLocation } from '@/libs'
import { Report } from '@/types'
import { storageReader } from '@/utils'

export const Home = () => {
  const [, setLocation] = useLocation()
  const reports: Report[] = storageReader('localStorage', 'reports')

  const handleSubmit = () => {
    setLocation(ROUTES.NEW_EXPENSE)
  }

  const getRandomEmptyMessage = () => {
    const randomIndex = Math.floor(Math.random() * HOME_EMPTY_MSG.length)
    return HOME_EMPTY_MSG[randomIndex]
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
            <Text fw={400} c="gray.6" className="text-sm max-w-[170px] text-center">
              {getRandomEmptyMessage()}
            </Text>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
