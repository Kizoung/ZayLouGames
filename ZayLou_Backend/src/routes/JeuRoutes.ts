import { Router } from 'express'
import * as gameController from '../controllers/jeuControllers'

// creation du routeur
const router : Router=Router()

// Lister tous les jeux
router.get('/', gameController.getAll)

// Recuperer jeu par son ID
router.get('/:id', gameController.getById)

// Crée un nouveau jeu
router.post('/', gameController.createJeu)

// Met à jour un jeu
router.put('/:id', gameController.updateJeu)

// Supprime un jeu
router.delete('/:id', gameController.deleteJeu)

export default router