const express = require('express');

const userCtrl = require('../controllers/utilisateurController');

const router = express.Router();

// Créer un utilisateur
router.post('/', userCtrl.creerUtilisateur) 
// Récupérer un utilisateur
router.get('/:id', userCtrl.getUtilisateur)  
// Connexion d'un utilisateur
router.post('/login', userCtrl.login)
// Met à jour un utilisateur
router.put('/:id', userCtrl.updateUser);

export default router;
