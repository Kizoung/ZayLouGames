import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GameProvider } from './contexts/GameContext'
import { UserProvider } from './contexts/UserContext'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <UserProvider>
    <GameProvider>
      <App />
    </GameProvider>
  </UserProvider>
  </React.StrictMode>
)
