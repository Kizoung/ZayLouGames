export type Effet = {
    id: string;             // identifiant de l'effet
    nom: string;            // nom de l'effet 
    description: string;    // description de l'effet
    duree: number;          // durée de l'effet en secondes
    vitesse?: number;       // effet sur la vitesse (optionnel)
    saut?: number;          // effet sur le saut (optionnel)
    degats?: number;        // effet sur les dégâts (optionnel)
};

export type TypeCellule = 'sol' | 'mur' | 'objet' | 'piege' | null;

export type Cellule = {
    row: number;            // ligne de la cellule
    col: number;            // colonne de la cellule
    type: TypeCellule;      // type de la cellule
    effets: Effet | null ;  // liste des effets appliqués à la cellule
    selection: boolean;     // indique si la cellule est sélectionnée
};
