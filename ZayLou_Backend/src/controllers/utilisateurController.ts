// src/controllers/utilisateurController.ts
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UtilisateurModel } from '../models/mongoose/UtilisateurModel'

function assertJwtSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET manquant dans les variables d’environnement')
  return secret
}

function generateToken(user: any) {
  return jwt.sign(
    { id: user._id },                // ⬅️ payload aligné avec le frontend (user.id)
    assertJwtSecret(),
    { expiresIn: '1d' }
  )
}

/**
 * POST /api/utilisateurs
 * Body: { nom, email, motDePasse }
 */
export async function creerUtilisateur(req: Request, res: Response) {
  try {
    const { nom, email, motDePasse } = req.body || {}

    if (!nom || !email || !motDePasse) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires' })
    }

    const exists = await UtilisateurModel.findOne({ email })
    if (exists) return res.status(409).json({ message: 'Email déjà utilisé' })

    const hash = await bcrypt.hash(motDePasse, 10)
    const user = new UtilisateurModel({ nom, email, motDePasse: hash })
    await user.save()

    return res.status(201).json({
      id: user._id,
      nom: user.nom,
      email: user.email,
      token: generateToken(user),
    })
  } catch (err: any) {
    console.error('creerUtilisateur:', err)
    return res.status(500).json({ message: 'Erreur serveur' })
  }
}

/**
 * POST /api/utilisateurs/login
 * Body: { email, motDePasse }
 */
export async function login(req: Request, res: Response) {
  try {
    const { email, motDePasse } = req.body || {}
    if (!email || !motDePasse) {
      return res.status(400).json({ error: 'Email et mot de passe requis' })
    }

    const user = await UtilisateurModel.findOne({ email })
    if (!user) return res.status(400).json({ error: 'Utilisateur introuvable' })

    const ok = await bcrypt.compare(motDePasse, user.motDePasse)
    if (!ok) return res.status(401).json({ error: 'Mot de passe incorrect' })

    return res.json({
      id: user._id,
      nom: user.nom,
      email: user.email,
      token: generateToken(user),
    })
  } catch (err: any) {
    console.error('login:', err)
    return res.status(500).json({ error: 'Erreur serveur' })
  }
}

/**
 * GET /api/utilisateurs/:id
 */
export async function getUtilisateur(req: Request, res: Response) {
  try {
    const { id } = req.params
    const user = await UtilisateurModel.findById(id).select('-motDePasse') // ne jamais renvoyer le hash
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' })
    return res.json(user)
  } catch (err: any) {
    console.error('getUtilisateur:', err)
    return res.status(500).json({ error: 'Erreur serveur' })
  }
}

/**
 * PUT /api/utilisateurs/:id
 * Body: { nom?, email?, motDePasse? }
 */
export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params
    const { nom, email, motDePasse } = req.body || {}

    const user = await UtilisateurModel.findById(id)
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' })

    if (email && email !== user.email) {
      const emailTaken = await UtilisateurModel.findOne({ email })
      if (emailTaken) return res.status(409).json({ error: 'Email déjà utilisé' })
      user.email = email
    }

    if (typeof nom === 'string' && nom.trim()) user.nom = nom.trim()
    if (typeof motDePasse === 'string' && motDePasse.trim()) {
      user.motDePasse = await bcrypt.hash(motDePasse, 10)
    }

    await user.save()

    return res.json({
      message: 'Profil mis à jour',
      id: user._id,
      nom: user.nom,
      email: user.email,
    })
  } catch (err: any) {
    console.error('updateUser:', err)
    return res.status(500).json({ error: 'Erreur serveur' })
  }
}


/**import { Request, Response } from 'express'
import { UtilisateurModel } from '../models/mongoose/UtilisateurModel'
import { v4 as uuidv4 } from 'uuid'
import { UtilisateurService } from '../services/UtilisateurService'
import Jwt  from 'jsonwebtoken'

export async function creerUtilisateur(req: Request, res: Response): Promise<void> {
  try {
    const nouveau = {
      ...req.body,
      idUtilisateur: uuidv4()
    }

    const utilisateurCree = await UtilisateurModel.create(nouveau)

    // Générer un token comme dans login()
    const token = Jwt.sign(
      { idUtilisateur: utilisateurCree.idUtilisateur },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    )

    console.log("Utilisateur inscrit :", utilisateurCree)

    // debug: renvoyer token + utilisateur
    res.status(201).json({ token, utilisateur: utilisateurCree })

  } catch (error) {
    res.status(500).json({ erreur: "Erreur lors de la création." })
  }
}

export async function login(req: Request, res: Response) {
    const { email, motDePasse } = req.body
    const service = new UtilisateurService()
    try {
      const { utilisateur, token } = await service.connecter(email, motDePasse)
      res.json({ token, utilisateur })
    } catch (e: any) {
      res.status(401).json({ erreur: e.message })
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
} */
