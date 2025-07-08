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
  id: string              // ID unique du jeu 
  nom: string             // Nom du jeu 
  auteur: string          // Nom ou identifiant de l’auteur
  grille: Grille          // Grille de jeu associée
  effets: Effet[]         // Liste des effets utilisés dans ce jeu
  dateCreation: Date      // Date de création

  constructor(id: string, nom: string, auteur: string, grille: Grille, effets: Effet[]) {
    this.id = id
    this.nom = nom
    this.auteur = auteur
    this.grille = grille
    this.effets = effets
    this.dateCreation = new Date()
  }
}