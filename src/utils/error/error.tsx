import { IconFile, IconMoodSad, IconPlugConnectedX } from '@/components/icons'
import { notification } from '@/services'

type NotificationParams = { title?: string; message: string; icon?: React.ReactNode }
type ConsoleParams = unknown

function notificationError(params: NotificationParams) {
  notification.show({ ...params, color: 'red' })
}

function consoleError(params?: ConsoleParams) {
  console.error(params)
}

const error = {
  notification: {
    network: function (params?: NotificationParams) {
      return notificationError({
        title: params?.title || 'Error',
        message: params?.message || 'Could not connect to the server',
        icon: <IconPlugConnectedX style={{ width: 14, height: 14 }} />,
      })
    },
    invalidFile: function (params?: NotificationParams) {
      return notificationError({
        title: params?.title || 'Invalid File',
        message: params?.message || 'Please select a valid file to proceed',
        icon: <IconFile style={{ width: 14, height: 14 }} />,
      })
    },
    default: function (params?: NotificationParams) {
      return notificationError({
        title: params?.title || 'Error',
        message: params?.message || 'Something went wrong',

        icon: <IconMoodSad style={{ width: 14, height: 14 }} />,
      })
    },
  },
  console: {
    network: function (params?: ConsoleParams) {
      return consoleError(params)
    },
  },
}

export { error }
