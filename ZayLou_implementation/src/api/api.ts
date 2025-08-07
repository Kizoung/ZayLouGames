const API_URL = 'http://localhost:3000/api'

export async function login(email: string, motDePasse: string): Promise<{ utilisateur: any, token: string }> {
  const res = await fetch(`${API_URL}/utilisateurs/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, motDePasse })
  })

  if (!res.ok) throw new Error('Login échoué')
  return res.json()
}

export async function getMesJeux(token: string) {
  const res = await fetch(`${API_URL}/jeux/moi`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  if (!res.ok) throw new Error('Erreur récupération jeux')
  return res.json()
}

export async function creerJeu(token: string, donnees: any) {
  const res = await fetch(`${API_URL}/jeux`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(donnees)
  })

  if (!res.ok) throw new Error('Création échouée')
  return res.json()
}
