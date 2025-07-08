// Importation des types et fonctions nécessaires depuis Express
import { Request, Response, Router } from 'express'

// Service de gestion des jeux (ajout, suppression, récupération)
import { JeuService } from '../services/JeuService'

// Modèle de données représentant un jeu
import { Jeu } from '../core/Jeu'

// Création d'une instance partagée du service en mémoire
const jeuService = new JeuService()

// Initialisation du routeur Express
const router: Router = Router()

// ---------------------------------------------
// GET /api/jeux → Liste de tous les jeux
// ---------------------------------------------
router.get('/', function (req: Request, res: Response): void {
  const jeux = jeuService.getAll()        // Récupération de tous les jeux en mémoire
  res.json(jeux)                          // Réponse JSON envoyée au client
})

// -------------------------------------------------
// GET /api/jeux/:id → Récupérer un jeu par son ID
// -------------------------------------------------
router.get('/:id', function (req: Request, res: Response): void {
  const jeu = jeuService.getById(req.params.id)     // Récupération du jeu
  if (jeu) {
    res.json(jeu)                                   // Si trouvé → réponse JSON
  } else {
    res.status(404).json({ message: 'Jeu non trouvé' }) // Sinon → erreur 404
  }
})

// -----------------------------------------------------
// POST /api/jeux → Créer un nouveau jeu depuis le corps JSON
// -----------------------------------------------------
router.post('/', function (req: Request, res: Response): void {
  const { id, nom, auteur, grille, effets } = req.body    // Extraction des champs

  // Vérifie que tous les champs nécessaires sont présents
  if (!id || !nom || !auteur || !grille || !effets) {
    res.status(400).json({ message: 'Champs manquants' })
    return
  }

  const jeu = new Jeu(id, nom, auteur, grille, effets)   // Création de l'objet jeu
  jeuService.ajouter(jeu)                                // Ajout au service mémoire

  res.status(201).json(jeu)                              // Retour du jeu créé
})

// ----------------------------------------------------
// DELETE /api/jeux/:id → Supprimer un jeu par son ID
// ----------------------------------------------------
router.delete('/:id', function (req: Request, res: Response): void {
  jeuService.supprimer(req.params.id)  // Suppression dans le service
  res.status(204).end()                // Pas de contenu en retour
})

// Export du routeur configuré pour utilisation dans index.ts
export default router
