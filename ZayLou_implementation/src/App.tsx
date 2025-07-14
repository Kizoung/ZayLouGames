import { Header } from './components/Header';
import {MenuControls} from './components/MenuControls';
import { Grid } from './components/Grid';
import { TypeSelector } from './components/TypeSelector';
import { GameProvider } from './contexts/GameContext';




import './styles/Header.css';
import './styles/Grid.css';
import './styles/App.css';



/* function initialiserGrille(): Cellule[][] {
  return Array.from({ length: NUM_ROWS }, (_, row) =>
    Array.from({ length: NUM_COLS }, (_, col) => ({
      row,
      col,
      effets: null,
      type: null,
      selection: false
    }))
  );
} */

function App() {

  return (
    <GameProvider>
        <Header />
        <MenuControls />
        <div 
          className='grille' 
          style={{ 
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Grid />
          <TypeSelector />
        </div>
    </GameProvider>
  );
}

export default App;


