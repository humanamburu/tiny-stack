import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    // Same-origin calls to /api → no CORS setup needed
    proxy: { '/api': 'http://localhost:3000' },
  },
})
