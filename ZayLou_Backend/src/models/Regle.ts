// import { Action } from './Action'
/**
 * Représente une règle de jeu (ex : condition de victoire,
 * limitation de déplacement…).
 */
export class Regle {
  id: string
  nom: string
  description: string
  conditionDéclenchement: string
  actionAppliquée: string

  constructor(
    id: string,
    nom: string,
    description: string,
    conditionDéclenchement: string,
    actionAppliquée: string
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
    return this.actionAppliquée.toLowerCase().includes('fin') || this.actionAppliquée.toLowerCase().includes('terminer')
  }

  /**
   * Retourne un résumé de la règle.
   */
  resume(): string {
    return `[${this.nom}] ${this.description} — Si "${this.conditionDéclenchement}", alors "${this.actionAppliquée}"`
  }

}
  