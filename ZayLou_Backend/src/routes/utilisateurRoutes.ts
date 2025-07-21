import { Router } from 'express'
import { creerUtilisateur, getUtilisateur } from '../controllers/utilisateurController'

const router = Router()

router.post('/', creerUtilisateur)
router.get('/:id', getUtilisateur)

export default router
