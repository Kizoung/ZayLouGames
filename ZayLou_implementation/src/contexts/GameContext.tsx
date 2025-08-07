import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

import type { CaseType } from '../types/types'

// Définition du type du contexte
interface GameContextType {
  nomJeu: string
  setNomJeu: (nom: string) => void
  types: CaseType[]
  setTypes: (t: CaseType[]) => void
  auteurId: string
  setAuteurId: (id: string) => void
  hasChanged: boolean
  setHasChanged: (changed: boolean) => void
  sauvegarder: () => void
}

// Création du contexte
const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [nomJeu, _setNomJeu] = useState('')
  const [types, _setTypes] = useState<CaseType[]>(Array(300).fill('vide'))
  const [auteurId, setAuteurId] = useState('')
  const [hasChanged, setHasChanged] = useState(false)

  const setNomJeu = (nom: string) => {
    _setNomJeu(nom)
    setHasChanged(true)
  }

  const setTypes = (t: CaseType[]) => {
    _setTypes(t)
    setHasChanged(true)
  }

  const sauvegarder = async () => {
    if (!nomJeu || !auteurId) {
      alert('Veuillez remplir le nom du jeu.')
      return
    }
    if (!hasChanged) {
      alert('Aucune modification à sauvegarder.')
      return
    }

    try {
      const jeuData = {
        nom: nomJeu,
        auteurId,
        types,
      }

      const response = await fetch('http://localhost:3000/api/jeux', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jeuData),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde du jeu')
      }

      const result = await response.json()
      alert(`Jeu "${result.nom}" sauvegardé avec succès !`)
      setHasChanged(false)
    } catch (error) {
      console.error('Erreur API:', error)
      alert('Erreur lors de la sauvegarde du jeu')
    }
  }

  return (
    <GameContext.Provider
      value={{
        nomJeu,
        setNomJeu,
        types,
        setTypes,
        auteurId,
        setAuteurId,
        hasChanged,
        setHasChanged,
        sauvegarder,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

//  accéder au contexte
export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
