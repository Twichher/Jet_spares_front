import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { myurl } from "./src/modules/url";

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    proxy: {
      "/api": {
        target: `http://${myurl}:4173`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
      "/spares/api": {
        target: `http://${myurl}:4173`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/spares\/api/, "/api"),
      },
    },
    strictPort: true,
    host: true,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1420,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
