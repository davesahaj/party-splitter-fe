import {
  cleanNotifications,
  hideNotification,
  NotificationData,
  NotificationsStore,
  showNotification,
  updateNotification,
} from '@mantine/notifications'

const config = {
  withCloseButton: true,
  autoClose: 5000,
  // classNames:{}
}

const notification = {
  show: function ({ ...otherProps }: NotificationData) {
    showNotification({
      ...config,
      ...otherProps,
      classNames: {
        body: '',
        description: '',
        root: '',
      },
    })
  },
  update: function ({ ...otherProps }: NotificationData) {
    updateNotification({ ...otherProps })
  },
  clear: function ({ id, ...otherProps }: NotificationsStore & { id: string }) {
    hideNotification(id, { ...otherProps })
  },
  clearAll: function () {
    cleanNotifications()
  },
}

export { notification }
