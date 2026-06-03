import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    // Force Vite to bypass LightningCSS rules and use safe, standard esbuild minification
    transformer: 'postcss',
    minify: 'esbuild'
  }
})
