/*
 Représente un joueur dans le jeu.
 Contient sa position, sa vitesse, et la liste des effets actifs.
*/


class Joueur {
    id: string;
    position: { x: number, y: number };
    vitesse: number;
    peutSauter: boolean;
    effetsActifs: Effet[];
    appliquerEffet(effet: Effet): void;
    déplacer(direction: 'gauche' | 'droite' | 'saut'): void;
  }
  