/**
 * Représente un élément placé sur la grille.
 * Peut être un joueur, un NPC, un item ou autre.
 */
export class Element {
    id: string
    type: 'joueur' | 'npc' | 'item' | 'decor'
    nom: string
    position: { x: number, y: number }
    propriétés: Record<string, any>
  
    constructor(
      id: string,
      type: 'joueur' | 'npc' | 'item' | 'decor',
      nom: string,
      position: { x: number, y: number },
      propriétés: Record<string, any> = {}
    ) {
      this.id = id
      this.type = type
      this.nom = nom
      this.position = position
      this.propriétés = propriétés
    }

      /**
   * Déplace l’élément à une nouvelle position.
   */
  deplacer(x: number, y: number): void {
    this.position = { x, y }
  }

  /**
   * Met à jour une propriété (ex: vie, force, inventaire...).
   */
  setPropriete(cle: string, valeur: any): void {
    this.propriétés[cle] = valeur
  }

  /**
   * Récupère une propriété.
   */
  getPropriete(cle: string): any {
    return this.propriétés[cle]
  }

  }
  