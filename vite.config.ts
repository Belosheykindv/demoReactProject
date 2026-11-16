import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@src': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/Components', import.meta.url)),
      '@hoc': fileURLToPath(new URL('./src/Hoc', import.meta.url)),
      '@redux': fileURLToPath(new URL('./src/Redux', import.meta.url)),
      types: fileURLToPath(new URL('./src/types', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/Utils', import.meta.url)),
    },
  },
  build: {
    outDir: 'build',
  },
})
