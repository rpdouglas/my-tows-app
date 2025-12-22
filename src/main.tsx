/**
 * @github_comment: "Entry point for the React application. Bootstraps the TOWS 
 * Analysis tool and imports global Tailwind styles."
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.css'
import './index.css' // <--- THIS LINE MUST BE PRESENT

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)