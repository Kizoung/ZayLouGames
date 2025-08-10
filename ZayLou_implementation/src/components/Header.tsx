import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/UserContext'
import creer from '../assets/icons/creer.png'
import mesJeux from '../assets/icons/mes_jeux.png'
import effets from '../assets/icons/effets.png'
import profil from '../assets/icons/profil.png'

export function Header() {
  const { user } = useAuth() // récupération des infos utilisateur
  const navigate = useNavigate()

  const allerSurGrille = () => {
    navigate('/') // redirige vers la grille
  }

  return (
    <header className="border-bottom border-dark px-4 py-3 d-flex
      align-items-center justify-content-between position-fixed top-0 start-0
      w-100" 
      style={{
        height: '100px',
        zIndex: 1000,
        background: 'linear-gradient(to right, #00cfd9, #a259c5)'
      }}
    >
      <div
        className="d-flex justify-content-between align-items-center w-100"
        style={{ maxWidth: '1600px' }} 
      >
        <div className="text-center fw-bold">
          <span style={{ fontSize: '1.4rem' }}>ZayLou<br />Games</span>
        </div>

        <div
          className="text-center fw-bold"
          style={{ cursor: 'pointer' }}
          onClick={allerSurGrille}
        >
          <img src={creer} alt="Créer jeu" width={50} height={50} className="mb-1" />
          <div>Créer jeu</div>
        </div>

        <div className="text-center fw-bold">
          <img src={mesJeux} alt="Mes jeux" width={50} height={50} 
            className="mb-1" />
          <div>Mes jeux</div>
        </div>

        <div className="text-center fw-bold">
          <img src={effets} alt="Mes effets" width={50} height={50} 
            className="mb-1" />
          <div>Mes effets</div>
        </div>

        <div className="text-center fw-bold">
          <Link
            to={user ? `/utilisateur/${user.id}` : '/auth'}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <img src={profil} alt="Mon profil" width={50} height={50} className="mb-1" />
            <div>Mon profil</div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;