import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: process.env.NODE_ENV === 'production' ? '/react-todolist' : '/',
    server: {
      port: parseInt(env.VITE_FRONTEND_PORT),
      host: true
    },
    plugins: [react()]
  }
})
