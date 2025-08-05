import mongoose from 'mongoose'

const jeuSchema = new mongoose.Schema({
  idJeu: { type: Number, unique: true },
  nom: { type:String, required: true },
  description: String,
  date_creation: { type: Date, default: Date.now },
  createur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
  nombre_joueur: Number,
  mode: String,
  regles: [String],
  assets: [String],
  effets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Effet' }]
}, { timestamps: true })

export const JeuModel = mongoose.model('Jeu', jeuSchema)