import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './contexts/UserContext'
import Header from './components/Header'
import MenuControls from './components/MenuControls'
import Grille from './components/Grille'
import Profil from './pages/Profil'
import Authentifier from './pages/Authentifier'

function ProtectedLayout() {
  const { user, ready } = useAuth()
  const location = useLocation()

  if (!ready) return null
  if (!user) return <Navigate to="/auth" replace />

  const isProfilPage = location.pathname.startsWith('/utilisateur/')
  return (
    <>
      <Header />
      {!isProfilPage && <MenuControls />}
      <Outlet />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      {/* Non-connectés → page d’auth */}
      <Route path="/auth" element={<Authentifier />} />

      {/* Zone protégée : header + grille après connexion */}
      <Route path="/" element={<ProtectedLayout />}>
        <Route index element={<Grille />} />
        <Route path="utilisateur/:id" element={<Profil />} />
      </Route>

      <Route path="*" element={<p>404</p>} />
    </Routes>
  )
}
