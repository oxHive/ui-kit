import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  root: __dirname,
  base: process.env.PLAYGROUND_BASE ?? '/',
  plugins: [vue()],
  build: {
    outDir: 'dist',
  },
})
