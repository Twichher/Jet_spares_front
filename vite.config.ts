import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/Jet_spares_front",  
  build: {
    outDir: 'dist'
        },
  server: {
    port: 3000,
    proxy: {
      "/api": { 
        // target: "https://my-local-server.local:8000",
        target: `http://192.168.1.5:8000`,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },
      "/spares/api": {
        // target: "https://my-local-server.local:8000",
        target: `http://192.168.1.5:8000`,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/spares\/api/, "/"),
      },
      "/Jet_spares_front/api": {
        // target: "https://my-local-server.local:8000",
        target: `http://192.168.1.5:8000`,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/Jet_spares_front\/spares\/api/, "/"),
      },
    }
  }
}
) 
