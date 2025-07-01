class ObjetJeu {
    id: string;
    type: 'bloc' | 'obstacle' | 'ennemi' | 'interactif' | 'arrivée';
    couleur: string;
    largeur: number;
    hauteur: number;
    interagir?(joueur: Joueur): void;
  }
  