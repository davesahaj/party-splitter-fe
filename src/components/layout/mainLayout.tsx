import { Header } from '@/components/ui/common'

type Props = { children: JSX.Element }

export const MainLayout = (props: Props) => {
  return (
    <div className="h-screen w-screen px-6 py-8 flex flex-col gap-y-8 bg-slate-100">
      <Header />
      {props.children}
    </div>
  )
}
