// Contient les fonctions de gestion de jeux en mémoire

import { Jeu } from '../models/Jeu'


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
    jeu.ajouterEffet = function (effet: Effet): void {
      this.effets.push(effet)
    }
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

  /**
 * Met à jour un jeu par son ID
 */
update(id: string, donnees: Partial<Jeu>): Jeu | undefined {
  const index = this.jeux.findIndex(j => j.id === id)
  if (index !== -1) {
    this.jeux[index] = Object.assign(this.jeux[index], donnees)
    return this.jeux[index]
  }
  return undefined
}

/**
 * Applique un effet à un jeu (structure simple)
 */
appliquerEffet(id: string, effet: any): Jeu | undefined {
  const jeu = this.getById(id)
  if (jeu) {
    jeu.effets?.push(effet)
  }
  return jeu
}


}
