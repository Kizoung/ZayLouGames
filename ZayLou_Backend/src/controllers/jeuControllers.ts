import { Request, Response } from 'express'
import { AuthRequest } from '../middlewares/AuthMiddleware';
import { JeuService } from '../services/JeuService'
import { genererIdJeuUnique } from "../utils/genererIdUnique";
import { Jeu } from '../models/Jeu'
import { UtilisateurModel } from '../models/mongoose/UtilisateurModel'
import { JeuModel } from '../models/mongoose/JeuModel';

const jeuService = new JeuService()  // creation instance jeuService

/**
 * Récupère tous les jeux
 */
export const getAll = async (req: Request, res: Response) => {
    try {
      const jeux: Jeu[] = jeuService.getAll()
      res.status(200).json(jeux)
    } catch (error) {
      res.status(500).json({ erreur: 'Erreur lors de la récupération des jeux' })
    }
  }
  
  /**
   * Récupère un jeu par son ID
   */
  export const getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const jeu = jeuService.getById(id)
  
      if (!jeu) {
        res.status(404).json({ erreur: 'Jeu non trouvé' })
        return
      }
  
      res.status(200).json(jeu)
    } catch (error) {
      res.status(500).json({ erreur: 'Erreur serveur' })
    }
  }
  
  
  /**
   * Crée un nouveau jeu
   */
  export const createJeu = async (req: AuthRequest, res: Response) => {
    try {
      //const idJeu = await genererIdJeuUnique()
      const userId = req.userId   // pour moi meme ajout de verifyToken
      const { ...reste } = req.body
  
      const utilisateur = await UtilisateurModel.findById(userId)
      if (!utilisateur) {
        res.status(404).json({ erreur: 'Utilisateur non trouvé' })
        return
      }
  
      const nouveauJeu = await JeuModel.create({ ...reste, createur: userId })
      utilisateur.jeux.push(nouveauJeu._id)
      await utilisateur.save()
      res.status(201).json(nouveauJeu)

    } catch (error) {
      res.status(400).json({ erreur: 'Création du jeu échouée' })
    }
  }
  
  /**
   * Met à jour un jeu existant
   */
  export const updateJeu = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const données = req.body
  
      const jeu = jeuService.getById(id)
      if (!jeu) {
        res.status(404).json({ erreur: 'Jeu non trouvé pour mise à jour' })
        return 
      }
  
      Object.assign(jeu, données) // mise à jour basique
      res.status(200).json(jeu)
    } catch (error) {
      res.status(400).json({ erreur: 'Mise à jour échouée' })
    }
  }
  
  /**
   * Supprime un jeu
   */
  export const deleteJeu = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const jeu = jeuService.getById(id)
      if (!jeu) {
        res.status(404).json({ erreur: 'Jeu non trouvé pour suppression' })
        return
      }
  
      jeuService.supprimer(id)
      res.status(204).send()
    } catch (error) {
      res.status(500).json({ erreur: 'Erreur lors de la suppression' })
    }
  }