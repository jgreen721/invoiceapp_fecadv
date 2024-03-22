import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { InvoiceProvider, UIProvider } from './context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UIProvider>
    <InvoiceProvider>
      <App />
    </InvoiceProvider>
    </UIProvider>
  </React.StrictMode>,
)
