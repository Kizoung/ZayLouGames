// GameContext.tsx — autosave 500ms + persistance par utilisateur
import React, { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import type { CaseType } from '../types/types'
import { useAuth } from '../contexts/UserContext'

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
  resetGrille: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

const EMPTY_GRID = () => Array<CaseType>(300).fill('vide')
const keyFor = (uid: string) => `game:${uid}`

export function GameProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const uid = user?.id ?? ''

  const [nomJeu, _setNomJeu] = useState('')
  const [types, _setTypes] = useState<CaseType[]>(EMPTY_GRID)
  const [auteurId, setAuteurId] = useState(uid)
  const [hasChanged, setHasChanged] = useState(false)

  // garde la dernière version écrite pour éviter d’écrire la même chose en boucle
  const lastSavedSnapshot = useRef<string>('')

  // charge depuis localStorage pour un user donné
  function load(uid: string) {
    if (!uid) return { nom: '', t: EMPTY_GRID() }
    try {
      const raw = localStorage.getItem(keyFor(uid))
      if (!raw) return { nom: '', t: EMPTY_GRID() }
      const parsed = JSON.parse(raw)
      const nom = typeof parsed?.nomJeu === 'string' ? parsed.nomJeu : ''
      const t = Array.isArray(parsed?.types) && parsed.types.length === 300 ? (parsed.types as CaseType[]) : EMPTY_GRID()
      return { nom, t }
    } catch {
      return { nom: '', t: EMPTY_GRID() }
    }
  }

  // 1) quand l’utilisateur change → charger sa grille sauvegardée
  useEffect(() => {
    setAuteurId(uid)
    if (!uid) {
      _setNomJeu('')
      _setTypes(EMPTY_GRID())
      setHasChanged(false)
      lastSavedSnapshot.current = ''
      return
    }
    const { nom, t } = load(uid)
    _setNomJeu(nom)
    _setTypes(t)
    setHasChanged(false)
    lastSavedSnapshot.current = JSON.stringify({ nomJeu: nom, types: t })
  }, [uid])

  // 2) autosave toutes les 500 ms
  useEffect(() => {
    if (!uid) return
    const id = window.setInterval(() => {
      const snapshot = JSON.stringify({ nomJeu, types })
      if (snapshot !== lastSavedSnapshot.current) {
        try {
          localStorage.setItem(keyFor(uid), snapshot)
          lastSavedSnapshot.current = snapshot
        } catch {}
      }
    }, 500)
    return () => window.clearInterval(id)
  }, [uid, nomJeu, types])

  // setters (marquent la grille comme modifiée)
  const setNomJeu = (nom: string) => { _setNomJeu(nom); setHasChanged(true) }
  const setTypes  = (t: CaseType[]) => { _setTypes(t); setHasChanged(true) }

  const resetGrille = () => {
    _setNomJeu('')
    _setTypes(EMPTY_GRID())
    setHasChanged(false)
    if (uid) {
      try { localStorage.removeItem(keyFor(uid)) } catch {}
      lastSavedSnapshot.current = ''
    }
  }

  // sauvegarde côté API (optionnelle, inchangée)
  const sauvegarder = async () => {
    if (!nomJeu || !auteurId) { alert('Veuillez remplir le nom du jeu.'); return }
    try {
      const res = await fetch('http://localhost:3000/api/jeux', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: nomJeu, auteurId, types }),
      })
      if (!res.ok) throw new Error('Erreur lors de la sauvegarde du jeu')
      const result = await res.json()
      alert(`Jeu "${result.nom}" sauvegardé avec succès !`)
      setHasChanged(false)
      // on synchronise aussi la version locale
      lastSavedSnapshot.current = JSON.stringify({ nomJeu, types })
      try { localStorage.setItem(keyFor(uid), lastSavedSnapshot.current) } catch {}
    } catch (e) {
      console.error('Erreur API:', e)
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
        resetGrille,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within a GameProvider')
  return ctx
}
