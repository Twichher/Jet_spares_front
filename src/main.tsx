import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import myStore from './modules/slieces/myStore.tsx'

createRoot(document.getElementById('root')!).render(
    <Provider store={myStore}>
        <App />
    </Provider>
        
)
