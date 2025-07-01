/*
 Service qui applique les effets sur un joueur ou un niveau.

 Chaque effet modifie temporairement un attribut
 (vitesse, gravité, contrôle, etc.)
*/

class EffetService {
    appliquerEffetSurJoueur(effet: Effet, joueur: Joueur): void;
    appliquerEffetSurNiveau(effet: Effet, niveau: Niveau): void;
  }
  