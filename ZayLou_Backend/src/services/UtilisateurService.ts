import { UtilisateurModel } from "../models/mongoose/UtilisateurModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UtilisateurService{
    /**
   * Crée un utilisateur avec hachage du mot de passe
   */
  async creerUtilisateur(email: string, motDePasse: string){
    const existe = await UtilisateurModel.findOne({email})
    if (existe) throw new Error('Utilisateur déjà existant')
    
    const hash = await bcrypt.hash(motDePasse,10)
    
    const utilisateur = new UtilisateurModel({email,motDePasse: hash })
    await utilisateur.save()
    
    return utilisateur
  }

   /**
   * Authentifie un utilisateur et retourne un token JWT
   */
   async connecter(email: string, motDePasse: string) {
    const utilisateur = await UtilisateurModel.findOne({ email })
    if (!utilisateur) throw new Error('Utilisateur non trouvé')

    const valide = await bcrypt.compare(motDePasse, utilisateur.motDePasse)
    if (!valide) throw new Error('Mot de passe invalide')

    const token = jwt.sign({ userId: utilisateur._id }, process.env.JWT_SECRET!, { expiresIn: '2h' })

    return { token, utilisateur }
  }

  /**
   * Récupère un utilisateur par son ID
   */
  async getById(id: string) {
    return UtilisateurModel.findById(id)
  }

}