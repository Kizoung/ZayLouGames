class Effet {
    id: string;
    nom: string;
    type: 'bonus' | 'malus';
    description: string;
    durée: number;
    cumulable: boolean;
    maxCumul: number;
    effetSur: 'joueur' | 'niveau';
    appliquer(joueur: Joueur | Niveau): void;
  }
  