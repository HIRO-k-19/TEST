import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base は GitHub Pages (https://hiro-k-19.github.io/TEST/) 配信用
export default defineConfig({
  base: '/TEST/',
  plugins: [react()],
})
