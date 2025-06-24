import { configureStore } from '@reduxjs/toolkit'
import { createSignalRListenerMiddleware } from './signalRMiddleware'
import notificationReducer from './notificationSlice'
import type { RegisterClientRequest } from '@/types/notification.types'

/**
 * Client registration data for SignalR hub
 */
const registerRequest: RegisterClientRequest = {
  clientId: 'client-12',
  clientName: 'ModernSPA',
  interfaceName: 'web',
}

// Create SignalR listener middleware
const signalRListenerMiddleware = createSignalRListenerMiddleware(registerRequest)

/**
 * Redux store configuration
 * Includes notification reducer and SignalR middleware for real-time updates
 */
export const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(signalRListenerMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
