import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'

type AuthData = {
  token: string
  id: string
  nom: string
  email: string
  isAdmin?: boolean
}

type AuthContext = {
  user: AuthData | null
  ready: boolean
  login: (data: AuthData) => void
  logout: () => void
}

const AuthCtx = createContext<AuthContext | undefined>(undefined)

export function useAuth() {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthData | null>(null)
  const [ready, setReady] = useState(false)

  const logout = useCallback(() => {
    setUser(null)
    try { localStorage.removeItem('auth') } catch {}
  }, [])

  // Valider côté backend que l'id existe (si non -> logout)
  async function validateUser(u: AuthData) {
    try {
      const res = await fetch(`http://localhost:3000/api/utilisateurs/${u.id}`, {
        headers: { Authorization: `Bearer ${u.token}` }
      })
      if (!res.ok) throw new Error('invalid user')
      // Optionnel: tu peux rafraîchir les infos utilisateur ici
      setUser(u)
    } catch {
      logout()
    } finally {
      setReady(true)
    }
  }

  // Lecture initiale + validation
  useEffect(() => {
    try {
      const raw = localStorage.getItem('auth')
      if (raw) {
        const saved = JSON.parse(raw) as AuthData
        validateUser(saved)
        return
      }
    } catch {}
    setReady(true)
  }, [])

  const login = useCallback((data: AuthData) => {
    setUser(data)
    try { localStorage.setItem('auth', JSON.stringify(data)) } catch {}
  }, [])

  const value = useMemo(() => ({ user, ready, login, logout }), [user, ready, login, logout])
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}


/**interface Utilisateur{
    idUtilisateur: string;
    email: string;
    nom: string;
   // jeux: string[];
}

interface UserContextType {
    token: string;
    setToken: (token: string) => void;
    utilisateur: Utilisateur | null;
    setUtilisateur: (utilisateur: Utilisateur | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState('');
    const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);

    return (
        <UserContext.Provider value={{ token, setToken, utilisateur, setUtilisateur }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
} */