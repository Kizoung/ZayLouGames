import { Router } from 'express'
import { getAll, getById, createJeu, updateJeu, deleteJeu } from '../controllers/jeuControllers'

import { verifyToken } from '../middlewares/AuthMiddleware'


// creation du routeur
const router : Router=Router()



// Crée un nouveau jeu
//router.post('/', gameController.createJeu)

// Met à jour un jeu
//router.put('/:id', gameController.updateJeu)

// Supprime un jeu
//router.delete('/:id', gameController.deleteJeu)

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', verifyToken, createJeu)
router.put('/:id', verifyToken, updateJeu)
router.delete('/:id', verifyToken, deleteJeu)

export default router