import React, { useState } from 'react';
import '../styles/MenuControls.css';

export function MenuControls() {
  const [nomJeu, setNomJeu] = useState('');

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

      <button className="btn sauvegarder" onClick={() => alert(`Sauvegarder "${nomJeu}"`)}>
        💾 Sauvegarder
      </button>
    </div>
);
}
