import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './css/global.css'
import './css/components.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { myStore } from './app/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={myStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
