import { useNotificationStore } from '@/store/notificationSlice'
import type { Notification } from '@/types/notification.types'

const typeStyles: Record<string, string> = {
  info: 'bg-blue-100 text-blue-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
}

export function Notification() {
  const { notifications, removeNotification } = useNotificationStore()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-96 max-w-full">
      {notifications.map((n: Notification) => (
        <div
          key={n.id}
          className={`flex items-center justify-between px-4 py-3 rounded shadow ${typeStyles[n.type] || typeStyles.info}`}
        >
          <span>{n.message}</span>
          <button
            className="ml-4 text-lg font-bold hover:opacity-70"
            onClick={() => removeNotification(n.id)}
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
