class Niveau {
    id: string;
    nom: string;
    grille: Case[][];
    effetsActifs: Effet[];         // Liste d’effets appliqués à ce niveau
    getCase(x: number, y: number): Case;
    réinitialiserEffets(): void;
  }
  