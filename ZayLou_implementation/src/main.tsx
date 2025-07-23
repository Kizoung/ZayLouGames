import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GameProvider } from './contexts/GameContext'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>
)
