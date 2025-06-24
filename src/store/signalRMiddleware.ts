import { createListenerMiddleware } from '@reduxjs/toolkit'
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr'
import type { NotificationDetailDto, RegisterClientRequest } from '@/types/notification.types'
import { addNotification } from './notificationSlice'
import { config } from '@/config'

/** Global SignalR connection instance */
let connection: HubConnection | null = null
/** Flag to prevent multiple initializations */
let isInitialized = false

/**
 * Creates a SignalR listener middleware for real-time notifications
 * @param {RegisterClientRequest} registerRequest - Client registration data
 * @returns {ReturnType<typeof createListenerMiddleware>} Configured listener middleware
 */
export const createSignalRListenerMiddleware = (registerRequest: RegisterClientRequest) => {
  const listenerMiddleware = createListenerMiddleware()

  // Create listener for SignalR initialization
  listenerMiddleware.startListening({
    predicate: () => true, // Triggers on any action
    effect: async (action, listenerApi) => {
      // Initialize SignalR only once
      if (!connection && !isInitialized) {
        isInitialized = true

        connection = new HubConnectionBuilder()
          .withUrl(config.signalR.hubUrl)
          .withAutomaticReconnect()
          .build()

        connection.on('ReceiveNotificationAsync', (notification: NotificationDetailDto) => {
          console.log(notification)
          listenerApi.dispatch(
            addNotification({
              type: notification.typeCode,
              message: notification.data ?? '',
            }),
          )
        })

        try {
          await connection.start()
          await connection.invoke('RegisterClientAsync', registerRequest)
          console.log('SignalR connected successfully')
        } catch (error) {
          console.error('SignalR connection error:', error)
        }
      }
    },
  })

  return listenerMiddleware
}

/**
 * Stops the SignalR connection and cleans up resources
 * @returns {Promise<void>} Promise that resolves when connection is stopped
 */
export const stopSignalR = async () => {
  if (connection) {
    try {
      await connection.stop()
    } catch (err) {
      console.error('Error stopping SignalR connection:', err)
    } finally {
      connection = null
      isInitialized = false
    }
  }
}
