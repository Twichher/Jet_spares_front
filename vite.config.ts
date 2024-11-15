import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Jet_spares_front",  
  server: {
    port: 3000,
    proxy: {
      "/api": { 
        target: "http://109.252.65.250:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },
    }
  }
}
) 
