import { Niveau } from "./Niveau";
import { Joueur } from "./Joueur";
import { Effet } from "./Effet";

class Jeu {
    id: string;
    nom: string;
    description: string;
    niveaux: Niveau[];             // Tableau pour sauvegarder les niveaux
    joueur: Joueur;
    carteEffets: Map<string, Effet>; // Lié aux cartes NFC
    ajouterNiveau(niveau: Niveau): void;
    appliquerEffet(carteId: string): void;
  }
  