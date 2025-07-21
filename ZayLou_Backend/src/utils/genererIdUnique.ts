import { JeuModel } from "../models/mongoose/JeuModel";

export async function genererIdJeuUnique(): Promise<number> {
  let id: number;
  let existe = true;

  while (existe) {
    id = Math.floor(10000 + Math.random() * 90000); // 5 chiffres aléatoires
    const jeu = await JeuModel.findOne({ idJeu: id });
    existe = !!jeu;
  }

  return id;
}
