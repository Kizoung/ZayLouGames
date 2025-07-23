import React, { createContext, useContext, useState, 
  type ReactNode } from 'react'

interface GameContextType {
  nomJeu: string
  setNomJeu: (nom: string) => void
  sauvegarder: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [nomJeu, setNomJeu] = useState('')

  const sauvegarder = () => {
    console.log('Sauvegarde du jeu :', nomJeu)
    alert('Jeu "${nomJeu}" sauvegardé')
  }

  return (
    <GameContext.Provider value={{ nomJeu, setNomJeu, sauvegarder }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
