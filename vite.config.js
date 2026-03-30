import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 9090,
    host: true,
    open: false
  },
  build: {
    chunkSizeWarningLimit: 500,
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})
