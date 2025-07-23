import { useGame } from '../contexts/GameContext'
import { FaPlay, FaSave } from 'react-icons/fa'
import 'bootstrap/dist/css/bootstrap.min.css'

export function MenuControls() {
  const { nomJeu, setNomJeu, sauvegarder } = useGame()

  return (
    <div
      className="d-flex align-items-center justify-content-between gap-4 px-4 
        py-3 border-bottom"
        style={{
          background: 'linear-gradient(to right, #aa5db8, #7563d9)',
          marginTop: '100px',
        }}
    >
      <input
        type="text"
        className="form-control form-control-lg"
        placeholder="Nom du jeu"
        value={nomJeu}
        onChange={(e) => setNomJeu(e.target.value)}
        style={{
          maxWidth: '300px',
          backgroundColor: 'black',
          color: '#ccc',
          fontFamily: 'Press Start 2P, sans-serif',
        }}
      />

      <button
        className="btn btn-outline-light d-flex align-items-center gap-2"
        onClick={() => alert('Tester')}
        style={{ fontFamily: 'Press Start 2P, sans-serif' }}
      >
        <FaPlay />
        Tester
      </button>

      <button
        className="btn btn-outline-light d-flex align-items-center gap-2"
        onClick={sauvegarder}
        style={{ fontFamily: 'Press Start 2P, sans-serif' }}
      >
        <FaSave />
        Sauvegarder
      </button>
    </div>
  )
}

export default MenuControls