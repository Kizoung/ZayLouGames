import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useAuth } from '../contexts/UserContext';

export default function FormulaireInscription() {
  const nav = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ nom: '', email: '', password: '' });
  const [confirm, setConfirm] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const MIN_LEN = 8;
  const pwTooShort = form.password.length > 0 && form.password.length < MIN_LEN;
  const pwMismatch  = confirm.length > 0 && confirm !== form.password;

  const formInvalid = useMemo(
    () => !form.nom || !form.email || !form.password || !confirm || pwTooShort || pwMismatch,
    [form, confirm, pwTooShort, pwMismatch]
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formInvalid) return;
    setMsg('Création…');
    setLoading(true);

    try {
      const base = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
      // 1) création de l’utilisateur
      const res = await fetch(`${base}/api/utilisateurs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nom: form.nom, 
          email: form.email, 
          motDePasse: form.password 
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        // message amical pour les cas les plus fréquents
        if (res.status === 409) throw new Error('Email déjà utilisé');
        if (res.status === 400) throw new Error(data.error || 'Champs manquants');
        throw new Error(data.error || data.message || 'Inscription échouée');
      }

      const { id, nom, email, token } = data;
      if (!id || !token) throw new Error('Réponse inscription invalide');

      login({ id, nom, email, token });
      nav('/'); // Affichera Header + Grille
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
        placeholder="Nom"
        value={form.nom}
        onChange={e => setForm({ ...form, nom: e.target.value })}
        required
      />

      <input
        className="form-control"
        type="email"
        placeholder="Courriel"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
      />

      {/* mot de passe + œil */}
      <div className="input-group">
        <input
          className={`form-control ${pwTooShort ? 'is-invalid' : ''}`}
          type={showPwd ? 'text' : 'password'}
          placeholder={`Mot de passe (min. ${MIN_LEN})`}
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
          aria-invalid={pwTooShort}
          minLength={MIN_LEN}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setShowPwd(!showPwd)}
          tabIndex={-1}
          aria-label={showPwd ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
        >
          {showPwd ? <BsEyeSlash/> : <BsEye/>}
        </button>
      </div>

      {/* confirmation */}
      <div className="input-group">
        <input
          className={`form-control ${pwMismatch ? 'is-invalid' : ''}`}
          type={showConfirm ? 'text' : 'password'}
          placeholder="Confirmer le mot de passe"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
          aria-invalid={pwMismatch}
          minLength={MIN_LEN}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setShowConfirm(v => !v)}
          tabIndex={-1}
          aria-label={showConfirm ? 'Masquer la confirmation' : 'Afficher la confirmation'}
        >
          {showConfirm ? <BsEyeSlash /> : <BsEye />}
        </button>
      </div>
      {pwMismatch && <div className="invalid-feedback d-block">Les mots de passe ne correspondent pas.</div>}

      <button className="btn btn-success" disabled={loading || formInvalid}>
        {loading ? 'Création…' : "S'inscrire"}
      </button>
      {msg && <div className="small text-muted">{msg}</div>}
    </form>
  );
}
