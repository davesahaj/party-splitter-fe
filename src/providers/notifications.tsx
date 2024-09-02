import { NativeNotifications } from '@/libs'

/*----------  Enables Mantine's Global Notification System  ----------*/

export function NotificationProvider() {
  return <NativeNotifications limit={10} position="top-center" />
}
