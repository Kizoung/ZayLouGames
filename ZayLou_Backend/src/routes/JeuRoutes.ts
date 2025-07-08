import  { Request, Response, Router } from 'express'
import { JeuService } from '../services/JeuService'
import { Jeu } from '../core/Jeu'

// Instance partagée du service (mémoire uniquement)
const jeuService = new JeuService()
const router: Router = Router()

// GET /api/jeux → Liste de tous les jeux
router.get('/', (req: Request, res: Response) => {
  const jeux = jeuService.getAll()
  res.json(jeux)
})

// GET /api/jeux/:id → Détail d’un jeu
router.get('/:id', (req: Request, res: Response) => {
  const jeu = jeuService.getById(req.params.id)
  if (jeu) {
    res.json(jeu)
  } else {
    res.status(404).json({ message: 'Jeu non trouvé' })
  }
})

// POST /api/jeux → Créer un nouveau jeu
router.post('/', (req: Request, res: Response) => {
  const { id, nom, auteur, grille, effets } = req.body

  if (!id || !nom || !auteur || !grille || !effets) {
    return res.status(400).json({ message: 'Champs manquants' })
  }

  const jeu = new Jeu(id, nom, auteur, grille, effets)
  jeuService.ajouter(jeu)

  res.status(201).json(jeu)
})

// DELETE /api/jeux/:id → Supprimer un jeu
router.delete('/:id', (req: Request, res: Response) => {
  jeuService.supprimer(req.params.id)
  res.status(204).end()
})

export default router
