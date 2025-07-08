
// Bibliotheque pour creer un serveur HTTP
import express from 'express'
//Autoriser les requêtes provenant d'autres domaines
import cors from 'cors'

import jeuRoutes from './routes/JeuRoutes.js'


// Lire les variables d'environnement
import dotenv from 'dotenv'
// Charger les variables d'environnement 
dotenv.config()
// creer serveur 
const app = express()
// Active CORS globalement pour permettre les appels du frontend
app.use(cors())

// Permettre au serveur de lire les données JSON envoyées dans les requêtes (POST/PUT)
app.use(express.json())

// Route GET de test à la racine 
app.get('/', (req, res) => {
  res.send('ZayLou Games API - Serveur opérationnel ON EST LES MEILLEUR MDRR')
})

// Définit le port d’écoute à partir de .env ou 3000 par défaut
const PORT = process.env.PORT || 3000

app.use('/api/jeux', jeuRoutes)

// Lance le serveur Express
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
})


