import { Effet } from '../models/Effet'
import { Joueur } from '../models/Joueur'
import { Grille } from '../models/Grille'
import { EffetActif } from '../types/EffetActif'


export class EffetService {

/**
   * Applique un effet à une cible (Joueur ou Grille)
   */
  appliquerEffet(effet: Effet, cible: Joueur | Grille): void {
    if (!('effets' in cible)) return

    const effetsActifs = cible.effets as EffetActif[]
    const effetExistant = effetsActifs.find(e => e.id === effet.id)

    if (effetExistant && !effet.cumulable) {
      effetExistant.debut = new Date()
      console.log(`[EffetService] ${effet.nom} réinitialisé`)
      return
    }

    const nouvelEffet: EffetActif = {
      ...effet,
      debut: new Date()
    }

    effetsActifs.push(nouvelEffet)
    cible.effets = effetsActifs
    console.log(`[EffetService] ${effet.nom} appliqué`)
  }

  /**
   * Supprime les effets expirés
   */

  majEffets(cible: Joueur | Grille): void {
    if (!('effets' in cible)) return
    const maintenant = new Date()

    cible.effets = (cible.effets as EffetActif[]).filter(effet => {
      const ecoule = (maintenant.getTime() - effet.debut.getTime()) / 1000
      return ecoule < effet.duree
    })
  }

   /**
   * Vérifie si un effet est actif
   */

  estActif(cible: Joueur | Grille, effetId: string): boolean {
    if (!('effets' in cible)) return false
    return (cible.effets as EffetActif[]).some(e => e.id === effetId)
  }
}
