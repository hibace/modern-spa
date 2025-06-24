import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Notification } from '@/types/notification.types'

/**
 * State interface for notification store
 */
interface NotificationState {
  /** Array of active notifications */
  notifications: Notification[]
}

/**
 * Initial state for notification store
 */
const initialState: NotificationState = {
  notifications: [],
}

/**
 * Redux slice for managing notifications
 * Provides actions for adding, removing, and clearing notifications
 */
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    /**
     * Adds a new notification to the beginning of the notifications array
     * @param {NotificationState} state - Current state
     * @param {PayloadAction<Notification>} action - Action with notification payload
     */
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload)
    },
    /**
     * Removes a notification by its type
     * @param {NotificationState} state - Current state
     * @param {PayloadAction<string>} action - Action with notification type to remove
     */
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n) => n.type !== action.payload)
    },
    /**
     * Clears all notifications from the store
     * @param {NotificationState} state - Current state
     */
    clearNotifications: (state) => {
      state.notifications = []
    },
  },
})

export const { addNotification, removeNotification, clearNotifications } = notificationSlice.actions
export default notificationSlice.reducer
