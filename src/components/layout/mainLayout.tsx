import { Header } from '@/components/ui/common'

type Props = { children: React.ReactNode }

export const MainLayout = (props: Props) => {
  return (
    <div className="h-[calc(100dvh_-_100px)] w-screen overflow-scroll px-6 lg:px-[35%] flex flex-col gap-y-8 bg-slate-100">
      <Header />
      {props.children}
    </div>
  )
}
