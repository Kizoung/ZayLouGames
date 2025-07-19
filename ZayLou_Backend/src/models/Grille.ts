import { Case, CaseType } from './Case'

/**
 * Représente la grille de jeu.
 * Contient toutes les cases (mur, vide, spawn, etc.).
 * Représente le cœur visuel du jeu sur la page Web.
 */
export class Grille {
  largeur: number         
  hauteur: number         
  tailleCase: number   
  couches: Case[][][]      

  constructor(largeur: number, hauteur: number, tailleCase: number, 
  nbCouches: number = 1) {
    this.largeur = largeur
    this.hauteur = hauteur
    this.tailleCase = tailleCase
    this.couches = []

    // Initialiser les couches
    this.couches = Array.from({ length: nbCouches }, (_, coucheIndex) =>
      Array.from({ length: hauteur}, (_, y) =>
        Array.from({ length: largeur}, (_, x) =>
          new Case(x, y, CaseType.Vide, coucheIndex)
        )
      )
    )

    /**for (let c = 0; c < nbCouches; c++) {
      const couche: Case[][] = []
      for (let y = 0; y < hauteur; y++) {
        const ligne: Case[] = []
        for (let x = 0; x < largeur; x++) {
          ligne.push(new Case(x, y, c, CaseType.Vide, c))
        }
        couche.push(ligne)
      }
      this.couches.push(couche)
    } */

  }

  /**
   * Met à jour une case à la position (x, y) dans une couche donnée
   */
  setCase(x: number, y: number, coucheIndex: number, 
  caseModifiee: Case): void {
    if (
      coucheIndex >= 0 && coucheIndex < this.couches.length &&
      y >= 0 && y < this.hauteur &&
      x >= 0 && x < this.largeur
    ) {
      this.couches[coucheIndex][y][x] = caseModifiee
    }
  }

  /**
   * Récupère une case à la position (x, y) dans une couche donnée
  */
  getCase(x: number, y: number, coucheIndex: number): Case | undefined {
    if (
      coucheIndex >= 0 && coucheIndex < this.couches.length &&
      y >= 0 && y < this.hauteur &&
      x >= 0 && x < this.largeur
    ) {
      return this.couches[coucheIndex][y][x]
    }
    return undefined
  }

  /**
   * Permet de réinitialiser la grille
   */
  resetGrille(): void {
    this.couches = Array.from({ length: this.couches.length }, (_, coucheIndex) =>
      Array.from({ length: this.hauteur}, (_, y) =>
        Array.from({ length: this.largeur}, (_, x) =>
          new Case(x, y, CaseType.Vide, coucheIndex)
        )
      )
    )
  }
  
}