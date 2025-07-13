export class Condition {
    attribut: string
    opérateur: '==' | '!=' | '<' | '>' | '<=' | '>='
    valeur: any
  
    constructor(attribut: string, opérateur: string, valeur: any) {
      this.attribut = attribut
      this.opérateur = opérateur as any
      this.valeur = valeur
    }
  
    estVérifiée(contexte: Record<string, any>): boolean {
      const actuel = contexte[this.attribut]
      switch (this.opérateur) {
        case '==': return actuel === this.valeur
        case '!=': return actuel !== this.valeur
        case '<': return actuel < this.valeur
        case '>': return actuel > this.valeur
        case '<=': return actuel <= this.valeur
        case '>=': return actuel >= this.valeur
        default: return false
      }
    }
  }
  