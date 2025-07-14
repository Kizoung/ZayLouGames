//import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import '../styles/MenuControls.css';

export function MenuControls() {
  const {nomJeu, setNomJeu, sauvegarder} = useGame();

  return (
    <div className="menu-controls">
      <input
        className="nom-jeu"
        type="text"
        placeholder="Nom du jeu"
        value={nomJeu}
        onChange={(e) => setNomJeu(e.target.value)}
      />

      <button className="btn tester" onClick={() => alert('Tester')}>
        ▶ Tester
      </button>

      <button className="btn sauvegarder" onClick={sauvegarder}>
        💾 Sauvegarder
      </button>
    </div>
  );
}
