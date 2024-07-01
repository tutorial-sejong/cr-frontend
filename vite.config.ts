import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@src", replacement: resolve(__dirname, "./src")
      },
      {
        find: "@components", replacement: resolve(__dirname, "./src/components")
      },
      {
        find: "@pages", replacement: resolve(__dirname, "./src/pages")
      },
      {
        find: "@assets", replacement: resolve(__dirname, "./src/assets")
      },
      {
        find: "@store", replacement: resolve(__dirname, "./src/store")
      },
      {
        find: "@plugins", replacement: resolve(__dirname, "./src/plugins")
      }
    ]
  }
})