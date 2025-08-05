import { Router } from 'express'
import { creerUtilisateur, getUtilisateur } from '../controllers/utilisateurController'
import {login} from '../controllers/utilisateurController'

const router = Router()

router.post('/', creerUtilisateur) // creer un utilisateur
router.get('/:id', getUtilisateur)  // recup utilisateur
router.post('/login', login)

export default router
