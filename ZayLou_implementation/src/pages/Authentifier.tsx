// pages/Authentifier.tsx
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/UserContext'
import FormulaireLogin from '../components/FormulaireLogin'
import FormulaireInscription from '../components/FormulaireInscription'

type Mode = 'login' | 'register'

export default function Authentifier() {
  const { user, ready } = useAuth()
  const [mode, setMode] = useState<Mode>('login')

  // Attendre l'init (lecture localStorage + validation éventuelle)
  if (!ready) return null

  // Si déjà connecté → retourner à l’accueil (Header + Grille via ProtectedLayout)
  if (user) return <Navigate to="/" replace />

  return (
    <div className="container" style={{ maxWidth: 520, paddingTop: 80 }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="h4 text-center mb-3">
            {mode === 'login' ? 'Connexion' : 'Inscription'}
          </h1>

          {/* sélecteur simple */}
          <div className="btn-group w-100 mb-3" role="group">
            <button
              type="button"
              className={`btn ${mode === 'login' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setMode('login')}
            >
              Se connecter
            </button>
            <button
              type="button"
              className={`btn ${mode === 'register' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setMode('register')}
            >
              Créer un compte
            </button>
          </div>

          {/* rend le formulaire choisi */}
          {mode === 'login'
            ? <FormulaireLogin />
            : <FormulaireInscription />
          }
        </div>
      </div>
    </div>
  )
}
