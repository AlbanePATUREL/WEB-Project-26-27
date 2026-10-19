import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuration Vite (serveur de dev + build pour Netlify)
export default defineConfig({
  plugins: [react()],
})
