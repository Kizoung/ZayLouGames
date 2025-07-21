import mongoose from "mongoose";

const joueurSchema = new mongoose.Schema({
  nom: String,
  pointsDeVie: { type: Number, default: 50 },
  effetsActifs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Effet" }],
  actionsPossibles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Action' }],
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' } 
}, { timestamps: true });

export const JoueurModel = mongoose.model("Joueur", joueurSchema);
