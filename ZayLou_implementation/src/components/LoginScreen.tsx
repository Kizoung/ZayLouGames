import {useState} from 'react'
import {login, getMesJeux} from '../api/api'

function LoginScreen(){
    const [email, setEmail] = useState('')
    const [motDePasse, setMotDePasse] = useState('')
    const [token, setToken] = useState('')
    const [jeux, setJeux] = useState([])

    async function handleLogin() {
        try{
            const {utilisateur,token} = await login(email, motDePasse)
            setToken(token)
            const mesJeux = await getMesJeux(token)
            setJeux(mesJeux)
          } catch (err) {
           alert('Erreur de connexion')
           console.error(err)
    }
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
    </div>
  )
}

export default LoginScreen