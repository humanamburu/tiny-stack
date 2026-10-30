import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  css: { modules: { localsConvention: 'camelCase' } },
  server: {
    port: 3001,
    proxy: { '/api': 'http://localhost:3000' },
  },
})
