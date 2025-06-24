import type { Middleware, Dispatch, AnyAction } from '@reduxjs/toolkit'
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr'
import type { NotificationDetailDto, RegisterClientRequest } from '@/types/notification.types'
import { useNotificationStore } from '@/store/notificationSlice'

let connection: HubConnection | null = null

export const createSignalRMiddleware =
  (registerRequest: RegisterClientRequest): Middleware =>
  () =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    if (!connection) {
      connection = new HubConnectionBuilder()
        .withUrl('/hubs/notification')
        .withAutomaticReconnect()
        .build()

      connection.on('ReceiveNotificationAsync', (notification: NotificationDetailDto) => {
        useNotificationStore.getState().addNotification({
          id: notification.id,
          type: notification.typeCode,
          message: notification.data || '',
        })
      })

      connection
        .start()
        .then(() => {
          connection?.invoke('RegisterClientAsync', registerRequest)
        })
        .catch(console.error)
    }
    return next(action)
  }

export function stopSignalR() {
  if (connection) {
    connection.stop()
    connection = null
  }
}
