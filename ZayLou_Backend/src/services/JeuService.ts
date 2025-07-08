// Contient les fonctions de gestion de jeux en mémoire

import { Jeu } from '../core/Jeu'

/**
 * Service pour gérer les jeux créés par les utilisateurs.
 * (Stockage en mémoire pour l’instant)
 */
export class JeuService {
  private jeux: Jeu[] = []  // Tous les jeux enregistrés

  // moyen recuperation ID

  /**
   * Retourne tous les jeux
   */
  getAll(): Jeu[] {
    return this.jeux
  }

  /**
   * Ajoute un nouveau jeu
   */
  ajouter(jeu: Jeu): void {
    this.jeux.push(jeu)
  }

  /**
   * Récupère un jeu par son ID
   */
  getById(id: string): Jeu | undefined {
    return this.jeux.find(j => j.id === id)
  }

  /**
   * Supprime un jeu par son ID
   */
  supprimer(id: string): void {
    this.jeux = this.jeux.filter(j => j.id !== id)
  }
}
