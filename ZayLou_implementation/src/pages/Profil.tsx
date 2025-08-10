import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { API_URL } from '../api/api';
import { useAuth } from '../contexts/UserContext';


type Form = { nom: string; email: string; password: string };

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const { user, ready, logout } = useAuth();
  const nav = useNavigate();
  const isSelf = !!user && !!id && user.id === id;
  const [form, setForm] = useState<Form>({ nom: '', email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [msg, setMsg] = useState<string>('Chargement…');

  // Chargement initial
  useEffect(() => {
    if (!id) {
      setMsg('Profil introuvable');
      return;
    }
    fetch(`${API_URL}/utilisateurs/${id}`, { method: 'GET' })
      .then(res => res.json())
      .then((data: any) => {
        setForm({ nom: data.nom ?? '', email: data.email ?? '', password: '' });
        setMsg('');
      })
      .catch(err => setMsg(err.message || 'Erreur de chargement'));
  }, [id]);

  // États d’attente / interdiction
  if (!ready) return null;
  if (!user) return <p className="text-center mt-4">Veuillez vous connecter</p>;
  if (!isSelf) return <p className="text-center mt-4">Accès interdit</p>;
  if (msg && msg.startsWith('Chargement')) return <p className="text-center mt-4">{msg}</p>;

  const handleLogout = () => {
    logout();                              // vide le contexte + localStorage
    nav('/auth?tab=register');                          // renvoie à la page connexion
  };

  // Mise à jour profil
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('Mise à jour…');
    try {
      const payload: any = { nom: form.nom, email: form.email };
      if (form.password.trim()) payload.motDePasse = form.password; // clé alignée avec backend

      const res = await fetch(`${API_URL}/utilisateurs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Erreur API');
      setMsg('Profil mis à jour');
      setForm(f => ({ ...f, password: '' }));
      setShowPwd(false);
    } catch (err: any) {
      setMsg(err.error || err.message || 'Erreur de mise à jour');
    }
  };

  return (
    <div className="container py-4" style={{ 
      maxWidth: 480,
      marginTop: '120px' }}>
      <h2 className="mb-3">Mon profil</h2>

      <form onSubmit={handleUpdate} className="d-grid gap-3">
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

        <div className="input-group">
          <input
            className="form-control"
            type={showPwd ? 'text' : 'password'}
            placeholder="Nouveau mot de passe (optionnel)"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            autoComplete="new-password"
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

        <button className="btn btn-primary">Mettre à jour</button>
        {msg && <div className="small text-muted">{msg}</div>}
      </form>

      {/* Bouton Déconnexion */}
        <button
          className="btn btn-outline-danger btn-sm mt-3"
          onClick={handleLogout}
        >
          Déconnexion
        </button>

    </div>
  );
}
