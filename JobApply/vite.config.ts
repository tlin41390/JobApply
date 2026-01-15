import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    middlewareMode: false,
    hmr: {
      host: 'localhost',
      port: 5173
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: '/index.html',
        options: '/src/pages/options/index.html',
        popup: '/src/pages/popup/index.html',
        background: '/src/extension/background.ts',
        content: '/src/extension/content.ts'
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
})
