// import { Application } from 'express';
// import { createProxyMiddleware } from 'http-proxy-middleware';

// export default function(app: Application) {
//   app.use(
//     '/spares',
//     createProxyMiddleware({
//       target: 'http://localhost:8000',
//       changeOrigin: true,
//       pathRewrite: {
//         '^/spares': '/spares',
//       },
//     })
//   );
// }


import { Application } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app: Application) {
  app.use(
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
      ws: true, 
      logLevel: 'debug', 
    })
  );
}
