import type { CaseType } from '../types/types'
import { FaSkull, FaUser } from 'react-icons/fa'


interface CaseProps {
  isSelected: boolean       // Si la case est sélectionnée
  onClick: () => void       // Quand on clique sur la case
  onMouseEnter: () => void  // Quand on glisse la souris sur la case
  type: CaseType
}

export function Case({ isSelected, onClick, onMouseEnter, type }: CaseProps) {
  let background = '#e0e0e0ff'
  // Icône à afficher dasn la case
  let content = null

  // Couleur de fond et contenu selon type de case
  if (type === 'mur') background = 'saddlebrown'
  if (type === 'herbe') background = '#0F0'
  if (type === 'piege') background = 'purple'
  if (type === 'monstre') {
    background = 'transparent'
    content = <FaSkull color="#F00" size={20} />
  }
  if (type === 'joueur') {
    background = 'transparent'
    content = <FaUser color="#000" size={20} />
  }

  // Couleur de sélection
  if (isSelected) background = '#00fffbff'

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: background,
        border: '1px solid #aaa',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {content}
    </div>
  )
}

export default Case