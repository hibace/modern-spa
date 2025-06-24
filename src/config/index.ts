export const config = {
  signalR: {
    hubUrl: import.meta.env.VITE_SIGNALR_HUB_URL,
  },
} as const
