// Lire les variables d'environnement
import dotenv from 'dotenv'
// Charger les variables d'environnement 
dotenv.config()
// Bibliotheque pour creer un serveur HTTP
import express from 'express'
//Autoriser les requêtes provenant d'autres domaines
import cors from 'cors'
import mongoose from 'mongoose'

import jeuRoutes from './routes/JeuRoutes'
import utilisateurRoutes from './routes/utilisateurRoutes'



// Création du serveur Express
const app = express()
// Active CORS globalement pour permettre les appels du frontend

app.use(cors({ origin: 'http://localhost:5173', credentials: false }))

// Permettre au serveur de lire les données JSON envoyées dans les requêtes (POST/PUT)
app.use(express.json())


/**app.use(cors({
  origin: ['http://localhost:5173'],       // ton frontend Vite
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: false,                               // laisse false si tu n’utilises PAS de cookies
  optionsSuccessStatus: 204
})) */


app.use('/api/utilisateurs', utilisateurRoutes)
app.use('/api/jeux', jeuRoutes)

// Route GET de test à la racine 
app.get('/', (req, res) => {
  res.send('ZayLou Games API : Serveur opérationnel ON EST LES MEILLEUR MDRR')
})




mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('Connexion MongoDB réussie'))
  .catch(err => console.error(' Erreur MongoDB :', err))






// Demarrage du serveur 
const PORT = process.env.PORT || 3000

// Lance le serveur Express
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
})


