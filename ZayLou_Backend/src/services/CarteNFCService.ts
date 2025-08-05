import fs from 'fs'
import path from 'path'

type CarteMapping = {

    idNFC: string
    idEffet: string
}

export class CarteNFC{
    private cartes: CarteMapping[]=[]

    constructor(){
        const filePath = path.join(__dirname, '../../data/cartes.json')
        try{
            const data = fs.readFileSync(filePath, 'utf-8')
            this.cartes= JSON.parse(data)
        }catch(error){
            console.error('[CarteNFCService] Erreur chargement cartes.json :', error)
        }
    }
    /**
   * Retourne l’ID de l’effet lié à une carte NFC
   */
    getEffetIdFromNFC(nfcId: string): string | null {
        const mapping = this.cartes.find(c => c.idNFC === nfcId)
        return mapping ? mapping.idEffet : null
      }
    
      /**
       * Liste toutes les cartes NFC connues
       */
      getAllCartes(): CarteMapping[] {
        return this.cartes
      }

}