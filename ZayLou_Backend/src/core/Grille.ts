import { Case } from './Case'

/**
 * Représente la grille de jeu.
 * Contient toutes les cases (mur, vide, spawn, etc.).
 * Représente le cœur visuel du jeu sur la page Web.
 */
export class Grille {
  largeur: number          // Nb de colonnes
  hauteur: number          // Nb de lignes
  cases: Case[][]          // Matrice de cases (2D)

  constructor(largeur: number, hauteur: number) {
    this.largeur = largeur
    this.hauteur = hauteur
    this.cases = []

    // Initialiser toutes les cases comme "vides"
    for (let y = 0; y < hauteur; y++) {
      const ligne: Case[] = []
      for (let x = 0; x < largeur; x++) {
        ligne.push(new Case(x, y, 'vide'))
      }
      this.cases.push(ligne)
    }
  }

  /**
   * Met à jour une case à la position (x, y)
   */
  setCase(x: number, y: number, caseModifiee: Case): void {
    if (x >= 0 && x < this.largeur && y >= 0 && y < this.hauteur) {
      this.cases[y][x] = caseModifiee
    }
  }

  /**
   * Récupère une case à la position (x, y)
   */
  getCase(x: number, y: number): Case | undefined {
    if (x >= 0 && x < this.largeur && y >= 0 && y < this.hauteur) {
      return this.cases[y][x]
    }
    return undefined
  }
}