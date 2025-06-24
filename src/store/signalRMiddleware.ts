import type { Middleware } from '@reduxjs/toolkit'
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr'
import type { NotificationDetailDto, RegisterClientRequest } from '@/types/notification.types'
import { addNotification } from './notificationSlice'
import { config } from '@/config'

let connection: HubConnection | null = null

export const createSignalRMiddleware =
  (registerRequest: RegisterClientRequest): Middleware =>
  (store) =>
  (next) =>
  (action) => {
    if (!connection) {
      connection = new HubConnectionBuilder()
        .withUrl(config.signalR.hubUrl)
        .withAutomaticReconnect()
        .build()

      connection.on('ReceiveNotificationAsync', (notification: NotificationDetailDto) => {
        console.log(notification)
        store.dispatch(
          addNotification({
            type: notification.typeCode,
            message: notification.data ?? '',
          }),
        )
      })

      connection
        .start()
        .then(() => {
          return connection?.invoke('RegisterClientAsync', registerRequest)
        })
        .catch((error) => {
          console.error('SignalR connection error:', error)
        })
    }

    return next(action)
  }

export const stopSignalR = async () => {
  if (connection) {
    try {
      await connection.stop()
    } catch (err) {
      console.error('Error stopping SignalR connection:', err)
    } finally {
      connection = null
    }
  }
}
