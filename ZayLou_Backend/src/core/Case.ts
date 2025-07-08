import { CarteNFC } from './CarteNFC'

/**
 * Représente une cellule de la grille (plateau de jeu).
 * 
 * Dans ma logique, sur la grille affiche, chaque cellule correspond à une Case
 * L’utilisateur choisit :
    son type (mur, vide, spawn…),
    s’il contient une carte (associée à un effet).
 */
export class Case {
  x: number               // Coordonnée X dans la grille
  y: number               // Coordonnée Y dans la grille
  type: 'vide' | 'mur' | 'spawn' | 'objectif' | 'interactif' // Type de case
  carte?: CarteNFC        // Carte associée à cette case (optionnel)

  constructor(x: number, y: number, type: 'vide' | 'mur' | 'spawn' | 'objectif' | 'interactif', carte?: CarteNFC) {
    this.x = x
    this.y = y
    this.type = type
    this.carte = carte
  }
}