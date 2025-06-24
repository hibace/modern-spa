import { configureStore } from '@reduxjs/toolkit'
import { createSignalRMiddleware } from './signalRMiddleware'
import notificationReducer from './notificationSlice'
import type { RegisterClientRequest } from '@/types/notification.types'

const registerRequest: RegisterClientRequest = {
  clientId: 'client-12',
  clientName: 'ModernSPA',
  interfaceName: 'web',
}

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createSignalRMiddleware(registerRequest)),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
