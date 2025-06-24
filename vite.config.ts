import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

/**
 * Vite configuration for the React application
 * Configures React plugin, path aliases, and build settings
 * @see https://vite.dev/config/
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      /** Path alias for src directory */
      '@': resolve(__dirname, 'src'),
    },
  },
})
