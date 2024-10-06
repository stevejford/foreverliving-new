import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/foreverliving-new/', // Adjust this to match your repo name
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})