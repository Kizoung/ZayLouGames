export class Action {
    type: string
    paramètres: Record<string, any>
  
    constructor(type: string, paramètres: Record<string, any>) {
      this.type = type
      this.paramètres = paramètres
    }
  
    exécuter(cible: any): void {
      // Logique d'exécution en fonction du type d’action
      console.log(`Action ${this.type} exécutée avec`, this.paramètres)
    }
  }
  