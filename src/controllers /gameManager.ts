/*
 Classe centrale de contrôle du jeu.
 Elle interagit avec les entités du modèle pour mettre à jour le gameplay.

 Exemple de rôle selon moi :
 - Initialiser le jeu
 - Scanner une carte et appliquer l’effet
 - Réinitialiser l’état
*/

class GameManager {
    jeuActuel: Jeu;
  
    initialiserJeu(): void;
    scannerCarte(idCarte: string): void;
    mettreAJourEtat(): void;
    testerCollision(): void;
  }
  