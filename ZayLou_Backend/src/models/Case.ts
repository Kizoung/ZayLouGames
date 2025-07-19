import { CarteNFC } from './CarteNFC'
import { Effet } from './Effet'


/**
 * Enumération des types de cases possibles sur la grille.
 */
export enum CaseType{
  Vide = 'vide',
  Mur = 'mur',
  Spawn = 'spawn',
  Objectif = 'objectif',
  Interactif = 'interactif', // A voir
  Personnages ='personnages',
  Piege = 'piege'
}

/**
 * Représente une cellule de la grille (plateau de jeu).
 * 
 * Dans ma logique, sur la grille affiche, chaque cellule correspond à une Case
 * L’utilisateur choisit :
    son type (mur, vide, spawn…),
    s’il contient une carte (associée à un effet).
 */
export class Case {
  x: number               
  y: number
  type: CaseType
  couche: number        // Pour savoir à quel couche appartient la case
  carte?: CarteNFC 
  effet?: Effet     

  constructor(x: number, y: number, type: CaseType, couche = 0, carte?: CarteNFC, effet?: Effet) {
    this.x = x
    this.y = y
    this.type = type
    this.couche = couche
    this.carte = carte
    this.effet = effet
  }

  /**
  * Indique si un effet est déclenché par cette case
  */
  hasEffet(): boolean {
    return this.effet !== undefined
  }

  /**
   * Permet de supprimer un effet sur le case s'il y en a
   */
  supprimerEffet(): void {
    if (this.hasEffet()) this.effet = undefined
  }

  /**
   * Permet d'ajouter un effet sur le case s'il n'y en a pas
   */
  ajouterEffet(effet: Effet): void {
    if (this.hasEffet()) {
      throw new Error("Un effet est déjà présent sur cette case.")
    }
    this.effet = effet
  }

}