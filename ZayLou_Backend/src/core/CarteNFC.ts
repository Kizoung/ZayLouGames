import { Effet } from './Effet'

// Lien dans l'application WEB

/**
 * Représente une carte NFC simulée dans l’éditeur.
 */
export class CarteNFC {
  id: string
  nom: string
  imageUrl?: string  //  // Image visuelle affichée dans l'interface
  effet: Effet // Effet associé à cette carte

  constructor(id: string, nom: string, effet: Effet, imageUrl?: string) {
    this.id = id
    this.nom = nom
    this.effet = effet
    this.imageUrl = imageUrl
  }
}