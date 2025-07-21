import mongoose from "mongoose";

const compteurSchema = new mongoose.Schema({
  nom: String,
  valeur: Number
});
const Compteur = mongoose.model("Compteur", compteurSchema);

export async function getNextId(sequenceName: string): Promise<number> {
  const resultat = await Compteur.findOneAndUpdate(
    { nom: sequenceName },
    { $inc: { valeur: 1 } },
    { new: true, upsert: true }
  );
  return resultat.valeur;
}
