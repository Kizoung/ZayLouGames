import {useState} from 'react'
import {login, getMesJeux} from '../api/api'
import { useUser } from '../contexts/UserContext'
import { useGame } from '../contexts/GameContext'
import RegisterScreen from '../RegisterScreen'

function LoginScreen(){
    const [email, setEmail] = useState('')
    const [motDePasse, setMotDePasse] = useState('')
    const {token, setToken} = useUser()
    const [jeux, setJeux] = useState([])
    const {setAuteurId} = useGame()
    const[showRegister, setShowRegister] = useState(false)

    async function handleLogin() {
        try{
            const {utilisateur,token} = await login(email, motDePasse)
            setToken(token)
            utilisateur(utilisateur)
            setAuteurId(utilisateur._idUtilisateur)
            const mesJeux = await getMesJeux(token)
            setJeux(mesJeux)
          } catch (err) {
            alert('Erreur de connexion')
            console.error(err)
    }
  }

  if (showRegister) {
    return (
      <>
        <RegisterScreen />
        <p style={{ marginTop: '1rem' }}>
          Déjà un compte ?{' '}
          <a href="#" onClick={() => setShowRegister(false)}>Se connecter</a>
        </p>
      </>
    )
  }
  
  return (
    <div className="container">
      <h2>Connexion</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Mot de passe" type="password" value={motDePasse} onChange={e => setMotDePasse(e.target.value)} />
      <button onClick={handleLogin}>Connexion</button>
  
      <h3>Mes jeux</h3>
      <ul>
        {jeux.map((jeu: any) => (
          <li key={jeu._id}>{jeu.nom}</li>
        ))}
      </ul>
  
      <p style={{ marginTop: '1rem' }}>
        Pas encore de compte ?{' '}
        <a href="#" onClick={() => setShowRegister(true)}>Créer un compte</a>
      </p>
    </div>
  )
}  
