import { Action } from './Action'
import { Condition } from './condition'
/**
 * Représente une règle de jeu (ex : condition de victoire,
 * limitation de déplacement…).
 */
export class Regle {
  id: string
  nom: string
  description: string
  conditionDéclenchement: Condition[]
  actionAppliquée: Action[]

  constructor(
    id: string,
    nom: string,
    description: string,
    conditionDéclenchement: Condition[],
    actionAppliquée: Action[]
  ) {
    this.id = id
    this.nom = nom
    this.description = description
    this.conditionDéclenchement = conditionDéclenchement
    this.actionAppliquée = actionAppliquée
  }

  /**
  * Vérifie si la règle est une règle de fin de partie.
  */
  estRegleDeFin(): boolean {
    const motsClesFin = ['fin', 'terminer', 'victoire', 'défaite', 'game over']

    return this.actionAppliquée.some(action => {
      const type = action.type
        .toLowerCase()
        .normalize('NFD')                 // décomposer les lettres avec accents 
        .replace(/[\u0300-\u036f]/g, '')  // enlever les accents

      return motsClesFin.some(mot => type.includes(mot))
    })
  }

  /*estRegleDeFin(): boolean {
    return this.actionAppliquée.toLowerCase().includes('fin') || this.actionAppliquée.toLowerCase().includes('terminer')
  }*/

  /**
   * Vérifie si les conditions sont réunis dans un contexte donné
   * 
   * @param contexte ensemble de paires clé-valeur représentant l'état actuel du jeu
   * @returns un booléen indiquant si toutes les conditions sont vérifiées
   */
  estDéclenchée(contexte: Record<string, any>): boolean {
    return this.conditionDéclenchement.every(cond => cond.estVérifiée(contexte))
  }

  /**
   * Retourne un résumé de la règle.
  */
  resume(): string {
    return `[${this.nom}] ${this.description} — Si "${this.conditionDéclenchement}", alors "${this.actionAppliquée}"`
  }

}
  