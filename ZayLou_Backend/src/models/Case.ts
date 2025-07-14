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
  carte?: CarteNFC 
  effet?: Effet     

  constructor(x: number, y: number, type: CaseType, carte?: CarteNFC, effet?: Effet) {
    this.x = x
    this.y = y
    this.type = type
    this.carte = carte
    this.effet = effet
  }

  /**
 * Indique si un effet est déclenché par cette case
 */
hasEffet(): boolean {
  return this.effet !== undefined
}
}