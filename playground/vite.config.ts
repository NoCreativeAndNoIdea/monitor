import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  server: {
    port: 10087
  },
  build: {
    sourcemap: true
  },
  plugins: [react()]
})
