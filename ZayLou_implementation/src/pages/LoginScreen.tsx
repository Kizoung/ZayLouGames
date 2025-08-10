import { useState } from 'react';
import SignupForm from './FormulaireInscription';
import LoginForm  from './FormulaireLogin';

export default function AuthPage() {
  const [tab, setTab] = useState('login');           // 'login' | 'signup'

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="card shadow-sm" style={{ minWidth: 380 }}>
        <ul className="nav nav-tabs nav-fill">
          <li className="nav-item">
            <button
              className={'nav-link ' + (tab === 'login' ? 'active' : '')}
              onClick={() => setTab('login')}
            >
              Connexion
            </button>
          </li>
          <li className="nav-item">
            <button
              className={'nav-link ' + (tab === 'signup' ? 'active' : '')}
              onClick={() => setTab('signup')}
            >
              Inscription
            </button>
          </li>
        </ul>

        <div className="card-body">
          {tab === 'login' ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
}