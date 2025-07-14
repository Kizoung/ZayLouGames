import { useState } from 'react';
//import type { Cellule } from '../types/types';
import { useGame } from '../contexts/GameContext';
import '../styles/Grid.css';

/* Les propriétés du composant Grid
type Props = {
    // Un tableau en 2 dimensions représentant la grille
    grille: Cellule[][];
    // Fonction pour mettre à jour la grille
    setGrille: React.Dispatch<React.SetStateAction<Cellule[][]>>;
}; */

export function Grid() {
    const { grille, setGrille } = useGame();
    // État local pour savoir si l'utilisateur maintient le clic
    const [isSelecting, setIsSelecting] = useState(false);

     // Active la sélection quand on clique sur une cellule
    function handleMouseDown(row: number, col: number) {
        setIsSelecting(true); // on entre en mode "sélection"
        updateSelection(row, col, true);
    }

    // Continue la sélection quand on passe sur une autre cellule
    function handleMouseEnter(row: number, col: number) {
        if (isSelecting) {
            updateSelection(row, col, true);
        }
    }

    // Quand on relâche le bouton, on arrête de sélectionner
    function handleMouseUp() {
        setIsSelecting(false);
    }

    // Met à jour la sélection d'une cellule précise
    function updateSelection(row: number, col: number, selected: boolean) {
        setGrille(prev =>
            // Parcourir chaque ligne de la grille
            prev.map((ligne, r) =>
                // Parcourir chaque cellule de la ligne
                ligne.map((cellule, c) =>
                    // Si c'est la cellule recherchée
                    r === row && c === col
                        // inverser la sélection
                        ? { ...cellule, selection: selected }
                        : cellule
                )
            )
        );
    }



    return (
        // Affiche la grille en utilisant un div pour chaque ligne et cellule
        <div className="grid" onMouseUp={handleMouseUp}>
            {/* Map sur chaque ligne de la grille */}
            {grille.map((ligne, row) => (
                // Pour chaque ligne, crée un div avec une clé unique
                <div key={row} className="row">
                    {/* Parcourir chaque cellule d'une ligne */}
                    {ligne.map((cellule) => (
                        <div
                            key={`${cellule.row}-${cellule.col}`}
                            // Gérer le css selon le type 
                            className={`cell ${
                                cellule.selection ? 'selected' : ''
                            } ${cellule.type || ''}`}
                            // Selectionner les cellules
                            onMouseDown={() => handleMouseDown(cellule.row, cellule.col)}
                            onMouseEnter={() => handleMouseEnter(cellule.row, cellule.col)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
