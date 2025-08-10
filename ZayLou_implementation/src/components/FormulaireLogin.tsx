import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useAuth } from '../contexts/UserContext';

function mapUtilisateurToAuth(utilisateur: any, token: string) {
  const id =
    utilisateur?._idUtilisateur ??
    utilisateur?._id ??
    utilisateur?.id ??
    utilisateur?.idUtilisateur;

  return {
    token,
    id,
    nom: utilisateur?.nom ?? '',
    email: utilisateur?.email ?? '',
    isAdmin: !!utilisateur?.isAdmin,
  };
}

export default function FormulaireLogin() {
  const nav = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email:'', password:'' });
  const [showPwd, setShowPwd] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('Connexion…');
    setLoading(true);
    try {
      const base = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
      const res = await fetch(`${base}/api/utilisateurs/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, motDePasse: form.password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message 
          || 'Échec de la connexion');
      }

      
      const { id, nom, email, token } = data;
      if (!id || !token) throw new Error('Réponse de login invalide');

      login({ id, nom, email, token });
      nav('/');
    } catch (err: any) {
      setMsg(err.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="d-grid gap-3">
      <input
        className="form-control"
        type="email"
        placeholder="Courriel"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
      />

      <div className="input-group">
        <input
          className="form-control"
          type={showPwd ? 'text' : 'password'}
          placeholder="Mot de passe"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setShowPwd(v => !v)}
          tabIndex={-1}
          aria-label={showPwd ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
        >
          {showPwd ? <BsEyeSlash /> : <BsEye />}
        </button>
      </div>

      <button className="btn btn-primary" disabled={loading}>
        {loading ? 'Connexion…' : 'Se connecter'}
      </button>
      {msg && <div className="small text-muted">{msg}</div>}
    </form>
  );
}
