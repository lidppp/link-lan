import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "../dist",
    sourcemap: false
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
})
