// IMPORTS
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'

// RENDER
const root = document.getElementById('root')
if (root === null) throw new Error('Impossible to render the application, the root element is missing.')
createRoot(root).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
