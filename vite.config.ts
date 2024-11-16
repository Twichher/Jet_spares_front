import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Jet_spares_front",  
  server: {
    port: 3000,
    proxy: {
      "/Jet_spares_front/api": { 
        // target: "http://localhost:8000",
        target: "https://breezy-hornets-create.loca.lt",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/Jet_spares_front\/api/, "/"),
      },
      "/Jet_spares_front/spares/api": {
        target: "https://breezy-hornets-create.loca.lt",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/Jet_spares_front\/spares\/api/, "/"),
      },
    }
  }
}
) 
