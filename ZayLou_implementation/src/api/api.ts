export const API_URL = import.meta?.env?.VITE_API_URL ?? 'http://localhost:3000/api';

type LoginResponse = { id: string; nom: string; email?: string; token: string };

export async function login(email: string, motDePasse: string): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/utilisateurs/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, motDePasse }),
    // credentials: 'include', // si tu utilises un cookie httpOnly
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(data?.error || data?.message || 'Login échoué');
  return data as LoginResponse;
}

export async function getMesJeux(token: string) {
  const res = await fetch(`${API_URL}/jeux/moi`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(data?.error || data?.message || 'Erreur récupération jeux');
  return data;
}

export async function creerJeu(token: string, donnees: any) {
  const res = await fetch(`${API_URL}/jeux`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(donnees),
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(data?.error || data?.message || 'Création échouée');
  return data;
}
