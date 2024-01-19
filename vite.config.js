import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
    "global": {}
  },
  plugins: [vue()],
})
