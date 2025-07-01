class Utilisateur {
    id: string;
    pseudo: string;
    jeux: Jeu[];
    sauvegarderJeu(jeu: Jeu): void;
    chargerJeu(id: string): Jeu;
  }
  