import { Condition } from './condition'
import { Action } from './Action'

/**
 * Représente un effet déclenché dans le jeu.
 */

export class Effet {
    id : string
    nom : string
    description : string
    type : string   // animation 
    paramètres : Record<string, any>  //details dynamiques
    trigger: 'tick' | 'deplacement' | 'debutTour' | 'changementAttribut' // etc.
    conditions: Condition[]
    actions: Action[]
    
    
    constructor(id: string, nom: string, description: string, type: string,
    paramètres: Record<string, any>,  
    trigger: 'tick' | 'deplacement' | 'debutTour' | 'changementAttribut',
    conditions: Condition[], actions: Action[]) {
        this.id = id
        this.nom = nom
        this.description = description
        this.type = type  
        this.paramètres = paramètres 
        this.trigger = trigger
        this.conditions = conditions
        this.actions = actions
      }
}