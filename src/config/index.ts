/**
 * Application configuration object
 * Contains environment-specific settings and API endpoints
 */
export const config = {
  signalR: {
    /** SignalR hub URL for real-time notifications */
    hubUrl: import.meta.env.VITE_SIGNALR_HUB_URL,
  },
} as const
