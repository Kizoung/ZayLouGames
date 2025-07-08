/**
 * Représente un effet déclenché dans le jeu.
 */

export class Effet {
    id : string
    nom : string
    description : string
    type : string   // animation 
    paramètres : Record<string, any>  //details dynamiques
    constructor(id: string, nom: string, description: string, type: string, paramètres: Record<string, any>) {
        this.id = id
        this.nom = nom
        this.description = description
        this.type = type  
        this.paramètres = paramètres
      }
}