import mongoose from 'mongoose'

const utilisateurSchema = new mongoose.Schema({
  idUtilisateur: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  nom: {type:String, required: true },
  jeux: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Jeu' }],
  motDePasse: { type: String, required: true },
  effets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Effet' }]
}, { timestamps: true })

export const UtilisateurModel = mongoose.model('Utilisateur', utilisateurSchema)