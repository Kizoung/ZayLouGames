import React from 'react';
import '../styles/Header.css';
import creer from '../assets/icons/creer.png';
import mesJeux from '../assets/icons/mes_jeux.png';
import effets from '../assets/icons/effets.png';
import profil from '../assets/icons/profil.png';


export function Header() {
  return (
    <header className="header">

      <div className="menu">

        <div className="menu-item">
          <span
            style={{ fontSize: '1.4rem' }}
          >
            ZayLou<br/>Games
          </span>
        </div>

        <div className="menu-item">
          <img src={creer} alt="Créer jeu" />
          <span>Créer jeu</span>
        </div>

        <div className="menu-item">
          <img src={mesJeux} alt="Mes jeux" />
          <span>Mes jeux</span>
        </div>

        <div className="menu-item">
          <img src={effets} alt="Mes effets" />
          <span>Mes effets</span>
        </div>

        <div className="menu-item">
          <img src={profil} alt="Mon profil" />
          <span>Mon profil</span>
        </div>

      </div>
    </header>
  );
}