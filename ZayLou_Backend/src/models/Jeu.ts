import { Grille } from './Grille'
import { Effet } from './Effet'

/**
 * Représente un jeu vidéo créé par un utilisateur.
 * C’est l’unité principale à sauvegarder et afficher dans la Web App :
    Quand un utilisateur crée un jeu alors on construis un objet Jeu.
     ensuite on peut :
        le sauvegarder dans la base,
        le retrouver dans “Mes jeux”,
        le recharger pour édition.
 */
export class Jeu {
  id: string              
  nom: string            
  auteur: string          
  grille: Grille         
  effets: Effet[]        
  dateCreation: Date     
  description: string
  nombreJoueurs: number
  regles : string
  mode: 'tour'|'pick'  //logique de jeu utilisée
  assets: string[]  // element visuel du jeu 
  configInitiale: any


  constructor(id: string, nom: string, auteur: string, grille: Grille, effets: Effet[], description: string,nombreJoueurs: number,regles: string,mode: 'tour'|'pick',assets: string[], configInitiale: any,) {
    this.id = id
    this.nom = nom
    this.auteur = auteur
    this.grille = grille
    this.effets = effets
    this.description = description
    this.nombreJoueurs = nombreJoueurs
    this.regles = regles
    this.mode = mode
    this.assets = assets
    this.configInitiale = configInitiale
    this.dateCreation = new Date()
  }

  ajouterEffet(effet: Effet): void{
    this.effets.push(effet)
  }

  supprimerEffet(idEffet: string):void {
    this.effets = this.effets.filter(e => e.id !== idEffet )
  }

  mettreAJourConfig(nouvelleConfig: any): void {
    this.configInitiale = nouvelleConfig
  }
  changerMode(mode: 'tour' | 'pick'): void {
    if (mode !== 'tour' && mode !== 'pick') {
      throw new Error('Mode invalide.')
    }
    this.mode = mode
  }

  estPretPourPublication(): boolean {
    return (
      this.nom.trim().length > 0 &&
      this.description.trim().length > 0 &&
      this.nombreJoueurs > 0 &&
      this.regles.trim().length > 0 &&
      this.grille != null &&
      this.effets.length > 0
    )
  }
  
  
  
}