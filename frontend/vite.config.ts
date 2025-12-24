import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    // CORREÇÃO DEFINITIVA: Política de segurança centralizada e correta
    headers: {
      'Content-Security-Policy': [
        "default-src 'self'",
        // PERMISSÃO CRÍTICA: Permite que o Vite use 'eval' em desenvolvimento
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        // Permite a conexão com a API do backend e o WebSocket do Vite
        "connect-src 'self' http://localhost:8765 ws://localhost:5173",
        // Permite fontes do Google
        "font-src 'self' https://fonts.gstatic.com",
        // Permite folhas de estilo do Google Fonts
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        // Permite imagens do IMDb
        "img-src 'self' data: https://m.media-amazon.com",
      ].join('; ')
    }
  }
})
