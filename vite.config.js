// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        film_page: resolve(__dirname, 'pages/film_page/index.html'),
      },
    },
  },
})