import { Effet } from './Effet'
import { Action } from './Action'

/**
 * Représente un joueur dans le jeu.
 * Possède des attributs de base comme point de vie,
 * les effets actifs, et les actions possibles.
 */
export class Joueur {
    id: string
    nom: string         // À voir
    pointsDeVie: number
    effetsActifs: Effet[]
    actionsPossibles: Action[]

    constructor(id: string, nom: string, pointsDeVie: number = 100) {
        this.id = id
        this.nom = nom
        this.pointsDeVie = pointsDeVie
        this.effetsActifs = []
        this.actionsPossibles = []
    }

    /**
     * Ajoute un effet actif au joueur.
     */
    ajouterEffet(effet: Effet): void {
        this.effetsActifs.push(effet)
    }

    /**
     * Supprime un effet actif du joueur.
     */
    supprimerEffet(effetId: string): void {
        this.effetsActifs = this.effetsActifs.filter(e => e.id !== effetId)
    }

    /**
     * Met à jour les points de vie du joueur.
     */
    mettreAJourPointsDeVie(nouveauxPoints: number): void {
        this.pointsDeVie = nouveauxPoints
        if (this.pointsDeVie <= 0) {
            this.pointsDeVie = 0
            console.log(`${this.nom} a été éliminé !`)
        }
    }
}