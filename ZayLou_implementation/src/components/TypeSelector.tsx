import React from 'react';
import type { Cellule } from '../types/types';

// Définir le type des cellules
type Props = {
  grille: Cellule[][];
  setGrille: React.Dispatch<React.SetStateAction<Cellule[][]>>;
};

// Composant pour sélectionner le type de cellule
// Permet de changer le type des cellules sélectionnées dans la grille
export function TypeSelector({ grille, setGrille }: Props) {
    // Types disponibles pour les cellules
    const types: (Cellule['type'])[] = ['sol', 'mur', 'objet', 'piege', null];

    // Fonction pour appliquer le type sélectionné aux cellules sélectionnées
    function appliquerType(type: Cellule['type']) {
        // Mettre à jour en changeant le type des cellules sélectionnées
        const nouvelleGrille = grille.map(ligne =>
            ligne.map(cellule =>
                // Si la cellule est sélectionnée, changer son type
                cellule.selection
                ? { ...cellule, 
                    type: type,
                    selection: false // Retirer sélection après changement
                }
                : cellule
            )
        );
        setGrille(nouvelleGrille);
  }

  return (
    <div style={{ marginLeft: '20px' }}>
      <h3>Choisir un type :</h3>
      {types.map((typeOption, i) => (
        <button
          key={i}
          style={{ margin: '4px', padding: '8px' }}
          onClick={() => appliquerType(typeOption)}
        >
          {typeOption === null ? '🕳️ Vide' : typeOption}
        </button>
      ))}
    </div>
  );
}
