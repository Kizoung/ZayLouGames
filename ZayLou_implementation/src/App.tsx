import { Header } from './components/Header';
import { useState } from 'react';
import { Grid } from './components/Grid';
import { TypeSelector } from './components/TypeSelector';
import type { Cellule } from './types/types';
import {MenuControls} from './components/MenuControls';
import './styles/Header.css';
import './styles/Grid.css';
import './styles/App.css';

const NUM_ROWS = 10;
const NUM_COLS = 10;

function initialiserGrille(): Cellule[][] {
  return Array.from({ length: NUM_ROWS }, (_, row) =>
    Array.from({ length: NUM_COLS }, (_, col) => ({
      row,
      col,
      effets: null,
      type: null,
      selection: false
    }))
  );
}

function App() {

  const [grille, setGrille] = useState<Cellule[][]>(initialiserGrille);

  return (
    <>
      <Header />
      <MenuControls />
      <div 
        className='grille' 
        style={{ 
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Grid grille={grille} setGrille={setGrille} />
        <TypeSelector grille={grille} setGrille={setGrille} />
      </div>
    </>
  );
}

export default App;


