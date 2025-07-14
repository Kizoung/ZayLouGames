// src/context/GameContext.tsx

import React, { createContext, useContext, useState } from 'react';
import type { Cellule } from '../types/types';

type GameContextType = {
  grille: Cellule[][];
  setGrille: React.Dispatch<React.SetStateAction<Cellule[][]>>;
  nomJeu: string;
  setNomJeu: React.Dispatch<React.SetStateAction<string>>;
  sauvegarder: () => void;
};

const GameContext = createContext<GameContextType | null>(null);

const NUM_ROWS = 10;
const NUM_COLS = 10;

// Fonction d'initialisation
function initialiserGrille(): Cellule[][] {
  return Array.from({ length: NUM_ROWS }, (_, row) =>
    Array.from({ length: NUM_COLS }, (_, col) => ({
      row,
      col,
      effets: null,
      type: null,
      selection: false,
    }))
  );
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [grille, setGrille] = useState<Cellule[][]>(initialiserGrille);
  const [nomJeu, setNomJeu] = useState<string>('Mon jeu');

  const sauvegarder = () => {
    const data = { nomJeu, grille };
    localStorage.setItem('zaylou_sauvegarde', JSON.stringify(data));
    alert('Sauvegarde réussie ✅');
  };

  return (
    <GameContext.Provider value={{ grille, setGrille, nomJeu, setNomJeu, sauvegarder }}>
      {children}
    </GameContext.Provider>
  );
}

// Hook personnalisé
export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within a GameProvider');
  return ctx;
}
