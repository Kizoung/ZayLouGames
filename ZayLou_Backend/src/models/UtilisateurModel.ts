import mongoose from 'mongoose'

const utilisateurSchema = new mongoose.Schema({
  nom: String,
  jeux: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Jeu' }],
  effets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Effet' }]
}, { timestamps: true })

export const UtilisateurModel = mongoose.model('Utilisateur', utilisateurSchema)