import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/customers': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/products': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
})
