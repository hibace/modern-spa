import { useSelector, useDispatch } from 'react-redux'
import { removeNotification, clearNotifications } from '@/store/notificationSlice'
import type { RootState } from '@/store'
import type { Notification as NotificationType } from '@/types/notification.types'
import { useEffect } from 'react'
import { NotificationIcon } from './NotificationIcon'
import React from 'react'

const typeStyles: Record<string, string> = {
  info: 'bg-blue-50 text-blue-900 border-blue-200',
  success: 'bg-green-50 text-green-900 border-green-200',
  warning: 'bg-yellow-50 text-yellow-900 border-yellow-200',
  error: 'bg-red-50 text-red-900 border-red-200',
}

export const Notification: React.FC = () => {
  const notifications = useSelector((state: RootState) => state.notification.notifications)
  const dispatch = useDispatch()

  // Автоудаление уведомлений через 5 секунд
  useEffect(() => {
    if (notifications.length === 0) return
    const timers = notifications.map((n) =>
      setTimeout(() => dispatch(removeNotification(n.type)), 5000),
    )
    return () => timers.forEach(clearTimeout)
  }, [notifications, dispatch])

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-96 max-w-full">
      <div className="mb-2 p-2 rounded bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold shadow-lg text-center">
        Tailwind работает!
      </div>
      {notifications.length === 0 ? (
        <div className="flex items-center justify-center px-4 py-3 rounded shadow bg-white/80 border border-gray-200 text-gray-500 animate-fade-in">
          <NotificationIcon type="info" />
          Нет уведомлений
        </div>
      ) : (
        <>
          <div className="flex justify-end pr-2">
            <button
              className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
              onClick={() => dispatch(clearNotifications())}
              aria-label="Очистить все уведомления"
            >
              Очистить все
            </button>
          </div>
          {notifications.map((n: NotificationType) => (
            <div
              key={n.type}
              className={`flex items-center justify-between px-4 py-3 rounded border shadow transition-all duration-300 animate-fade-in ${typeStyles[n.type] || typeStyles.info}`}
              style={{ minHeight: 48 }}
            >
              <div className="flex items-center">
                <NotificationIcon type={n.type} />
                <span>{n.message}</span>
              </div>
              <button
                className="ml-4 text-lg font-bold hover:opacity-70 focus:outline-none"
                onClick={() => dispatch(removeNotification(n.type))}
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
          ))}
        </>
      )}
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(-10px);} to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 0.3s ease; }
      `}</style>
    </div>
  )
}
