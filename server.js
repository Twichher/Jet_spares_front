import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { fileURLToPath } from 'url';
import path from "path";

const app = express();
const PORT = 5173;

// Определение __dirname для ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Проксирование первого URL
app.use(
  "/Jet_spares_front/api",
  createProxyMiddleware({
    target: "https://localhost:8000",
    changeOrigin: true,
    secure: false,
    pathRewrite: { "^/Jet_spares_front/api": "/" },
  })
);

// Проксирование второго URL
app.use(
  "/Jet_spares_front/spares/api",
  createProxyMiddleware({
    target: "https://localhost:8000",
    changeOrigin: true,
    secure: false,
    pathRewrite: { "^/Jet_spares_front/spares/api": "/" },
  })
);

// Обслуживание статических файлов из папки dist
app.use(express.static(path.join(__dirname, "dist")));

// Обработка всех остальных маршрутов
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
