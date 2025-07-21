import { RequestHandler } from 'express'
import { JeuService } from '../services/JeuService'
import { genererIdJeuUnique } from "../utils/genererIdUnique";
import { Jeu } from '../models/Jeu'
import { UtilisateurModel } from '../models/mongoose/UtilisateurModel'

const jeuService = new JeuService()  // creation instance jeuService

/**
 * Récupère tous les jeux
 */
export const getAll: RequestHandler = async (req, res) => {
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
  export const getById: RequestHandler = async (req, res) => {
    try {
      const id = req.params.id
      const jeu = jeuService.getById(id)
  
      if (!jeu) {
        res.status(404).json({ erreur: 'Jeu non trouvé' })
      }
  
      res.status(200).json(jeu)
    } catch (error) {
      res.status(500).json({ erreur: 'Erreur serveur' })
    }
  }
  
  /**
   * Crée un nouveau jeu
   */
  export const createJeu: RequestHandler = async (req, res) => {
    try {
        const idJeu = await genererIdJeuUnique()
        const { idUtilisateur, ...reste } = req.body
    
        const utilisateur = await UtilisateurModel.findById(idUtilisateur)
        if (!utilisateur) {
          res.status(404).json({ erreur: 'Utilisateur non trouvé' })
          return
        }
    
        const nouveauJeu = { ...reste, id: idJeu }
        const jeuCree = await jeuService.ajouter(nouveauJeu)
    
        utilisateur.jeux.push(idJeu)
        await utilisateur.save()
    
        res.status(201).json(jeuCree)
      } catch (error) {
        res.status(400).json({ erreur: 'Création du jeu échouée' })
      }
    }

  
  /**
   * Met à jour un jeu existant
   */
  export const updateJeu: RequestHandler = async (req, res) => {
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
  export const deleteJeu: RequestHandler = async (req, res) => {
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