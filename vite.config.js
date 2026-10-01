import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // three.js is only reached through the lazily imported 3D scene, so it lands in that
    // scene's own chunk. (A manual 'three' chunk also swallowed React and so loaded up front.)
    chunkSizeWarningLimit: 1200,
  },
})
