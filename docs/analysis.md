# Études préliminaires

## Analyse du problème

De nombreuses plateformes de création de jeux vidéo existent aujourd'hui, mais elles présentent plusieurs limitations pour un public jeune ou novice:
    - Complexité excessive pour les jeunes utilisateurs : des outils comme Unity ou Construct, bien que puissants, peuvent décourager les débutant par leur interface technique;
    - Peu d'interactivité physique: Peu de plateformes permettent l'intégration de composants physiques comme les cartes NFC, réservées aux jeux commerciaux complexes;
    - Accessibilité limitée: Certaines plateformes ne sont pas compatibles avec les appareils mobiles ou nécessitent des installations complexes.
ZayLou Games vise à résoudre ces problèmes en proposant une solution à la fois accessible, interactive et adaptée à un jeune public.

## Exigences

- Fonctionnelles:
    - Création simple de jeu:
        - Création de jeux avec:
            - Nom, description, Catégorie, etc;
            - Ajout de quelques éléments de jeu de base (objets prédéfinis);
        - Éléments de jeu disponibles:
            - Objets standards : porte, bloc, obstacle, ennemi;
            - Dimensions ajustables (largeur/ hauteur)
        - Positionnement libre sur une grille de type 2D:
            - Possibilité d’empiler des objets en les plaçant côte à côte, mais non superposés visuellement;
        - Restriction:
            - Système de règles complexes (gravité, score, checkpoint, etc);
    - Détection NFC avec un effet simple:
        - App React Native capable de:
            - Scanner une carte NFC;
            - Associer cette carte à un identifiant;
            - Appliquer un effet affiché à l'écran;
    - Interface minimaliste de test:
        - Menu;
        - Liste des jeux créés;
        - Visualisation simple du monde et des effets;
        - Éditeur de jeu:
            - Zone de création en grille 2D;
            - Palette d'objets prédéfinis à glisser;
            - Bouton "Tester" pour lancer une simulation;
    - Backend de base:
        - Api:
            - Envoi d'effet par ID de carte;
            - Récupération des effets;
            - Mise à jour d'un jeu;
    - Base de données simple:
        - Stockage des:
            - Utilisateurs (au moins en local);
            - Jeux créés;
            - Cartes NFC et effets associés;
- Non Fonctionnelles:

## Recherche de solutions

- Solutions existantes:
    - Scratch, Unity Playground, Gamefroot : plateformes avec interfaces simplifiées, adaptées à l’apprentissage du game design pour les jeunes;
    - Construct ou Unity : plateformes puissantes, mais souvent trop complexes pour les débutants;
    - Amiibo (Nintendo) ou cartes NFC pour escape games : intégration physique limitée à des jeux propriétaires.
- Justification du choix:
    Aucune des solutions existantes ne combine accessibilité, créativité, et interactivité physique via NFC. ZayLou Games innove en:
        - Offrant un outil de création sans code accessible aux jeunes;
        - Intégrant des interactions physiques via cartes NFC;
        - Assurant la compatibilité web/mobile avec une interface unique.

## Méthodologie

Le projet suivra une méthodologie Agile, adaptée aux projets courts et évolutifs:
    - Réunions hebdomadaires avec le superviseur pour évaluer les progrès et ajuster le travail;
    - Répartition des tâches entre les membres tout en assurant une compréhension globale par chacun;
    - Veille technologique continue avec tutoriels, vidéos, forums et documentation pour résoudre les problèmes et s’inspirer des bonnes pratiques.