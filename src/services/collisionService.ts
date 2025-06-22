/*
 * Service qui vérifie s’il y a collision entre le joueur et un objet
 * sur une case de la grille, et gère l’interaction si nécessaire.
 */

class CollisionService {
    estCollision(joueur: Joueur, objet: ObjetJeu): boolean;
    gérerCollision(joueur: Joueur, caseGrille: Case): void;
  }
  