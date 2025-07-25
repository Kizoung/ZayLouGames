import { useState, useRef } from 'react'
import Case from './Case'
import type { CaseType } from '../types/types'

export function Grille() {
  // Dimension de la grille
  const lignes = 10
  const colonnes = 30
  const totalCases = lignes * colonnes

  // Contient de le type de chacune des cases
  const [types, setTypes] = useState<CaseType[]>(
    Array(totalCases).fill('vide')
  )
  // Indique si les cases sont sélectionnées ou non
  const [selected, setSelected] = useState<boolean[]>(
    Array(totalCases).fill(false)
  )
  // Indique si l'utilisateur glisse la souris ou non
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef(false)

  // Inverser la sélection
  const toggleSelection = (index: number) => {
    setSelected((prev) => {
      const newSel = [...prev]
      newSel[index] = !newSel[index]
      return newSel
    })
  }
  // Tout déselectionner
  const clearSelection = () => {
    setSelected(Array(totalCases).fill(false))
  }

  const applyTypeToSelected = (newType: CaseType) => {
    // Nombre de case sélectionnée
    const selectedCount = selected.filter(Boolean).length

    // On ne peut avoir qu'un seul joueur
    if (newType === 'joueur') {
      const alreadyHasPlayer = types.includes('joueur')
      if (alreadyHasPlayer) {
        alert('Une case est déjà définie comme joueur.')
        clearSelection()
        return
      }
      // Une seule case doit être sélectionnée pour avoir le joueur
      if (selectedCount !== 1) {
        alert('Sélectionnez une seule case pour le joueur.')
        clearSelection()
        return
      }
    }
    // Mettre à jour le tableau des types
    setTypes((prev) =>
      prev.map((t, i) => (selected[i] ? newType : t))
    )
    clearSelection()
  }

  return (
    <>
      <div
        className="grille"
        onMouseDown={() => {
          setIsDragging(true)
          dragStart.current = true
        }}
        onMouseUp={() => {
          setIsDragging(false)
          dragStart.current = false
        }}
        onMouseLeave={() => setIsDragging(false)}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${colonnes}, 1fr)`,
          width: '100vw',
          aspectRatio: `${colonnes} / ${lignes}`,
          border: '2px solid black',
          userSelect: 'none',
        }}
      >
        {Array.from({ length: totalCases }, (_, i) => (
          <Case
            key={i}
            type={types[i]}
            isSelected={selected[i]}
            onClick={() => toggleSelection(i)}
            onMouseEnter={() => {
              if (isDragging) {
                setSelected((prev) => {
                  const copy = [...prev]
                  copy[i] = true
                  return copy
                })
              }
            }}
          />
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        {(['vide', 'mur', 'herbe', 'piege', 'monstre', 'joueur'] as CaseType[]).map((t) => (
          <button key={t} onClick={() => applyTypeToSelected(t)}>
            {t}
          </button>
        ))}
      </div>
    </>
  )
}

export default Grille
