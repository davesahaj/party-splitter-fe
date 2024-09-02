import { BottomBar } from '@/components/ui/common'

type Props = { children: React.ReactNode; buttonProps: { onClick: () => void; text: string } }

export const PageLayout = ({ children, buttonProps }: Props) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col space-y-10">{children}</div>
      <BottomBar {...buttonProps} />
    </div>
  )
}
