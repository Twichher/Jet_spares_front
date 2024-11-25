import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from "react-redux";
import { world_spares } from './slices/sparesRed';

createRoot(document.getElementById('root')!).render(
  <Provider store={world_spares}>
    <App />
  </Provider>
)

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .catch(err => console.log("service worker not registered", err))
    })
  }
