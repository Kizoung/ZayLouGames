import { Request, Response } from 'express'
import { UtilisateurModel } from '../models/mongoose/UtilisateurModel'
import { v4 as uuidv4 } from 'uuid'

export async function creerUtilisateur(req: Request, res: Response): Promise<void> {
  try {
    const nouveau = {
      ...req.body,
      idUtilisateur: uuidv4()
    }
    const utilisateurCree = await UtilisateurModel.create(nouveau)
    res.status(201).json(utilisateurCree)
  } catch (error) {
    res.status(500).json({ erreur: "Erreur lors de la création." })
  }
}

export async function getUtilisateur(req: Request, res: Response): Promise<void> {
  try {
    const utilisateur = await UtilisateurModel.findById(req.params.id)
    if (!utilisateur) {
        res.status(404).json({ erreur: "Introuvable" })
        return
      }
      
    res.json(utilisateur)
  } catch (error) {
    res.status(500).json({ erreur: "Erreur serveur." })
  }
}
