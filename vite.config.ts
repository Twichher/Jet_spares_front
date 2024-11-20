import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { myurl } from "./src/modules/url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Jet_spares_front",  
  server: {
    port: 3000,
    proxy: {
      "/Jet_spares_front/api": { 
        // target: "https://my-local-server.local:8000",
        target: `http://${myurl}:4173`,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/Jet_spares_front\/api/, "/api"),
      },
      "/Jet_spares_front/spares/api": {
        // target: "https://my-local-server.local:8000",
        target: `http://${myurl}:4173`,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/Jet_spares_front\/spares\/api/, "/api"),
      },
    }
  }
}
) 
