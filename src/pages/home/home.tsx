import { IconToolsKitchen2 } from '@/components/icons'
import { BillCard } from '@/components/ui/common'
import { Button, Text } from '@/components/ui/core'
import { ROUTES } from '@/constants'
import { Link } from '@/libs'
import { Report } from '@/types'
import { storageReader } from '@/utils'

export const Home = () => {
  const reports: Report[] = storageReader('localStorage', 'reports')

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col xl:flex-row gap-y-4 xl:gap-4">
        {Array.isArray(reports) ? (
          reports.map(({ venue, date, total, participants }) => (
            <BillCard key={venue} venue={venue} cost={total} date={date} people={participants.length} />
          ))
        ) : (
          <div className="flex flex-col gap-y-6 w-full justify-center bg-slate-200 items-center rounded-full aspect-square">
            <IconToolsKitchen2 className="h-auto w-1/3 stroke-[1] text-slate-400" />
            <Text fw={600} c="gray.6">
              No reports yet
            </Text>
          </div>
        )}
      </div>

      <Link to={ROUTES.NEW_EXPENSE} className="w-full no-underline">
        <Button classNames={{ root: 'w-full xl:w-auto xl:float-right' }} size="lg">
          Add Expense
        </Button>
      </Link>
    </div>
  )
}
