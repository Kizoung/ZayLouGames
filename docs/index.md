# Projet IFT3150: Nom du projet

> **Thèmes**: Science de données, Génie logiciel  
> **Superviseur**: Louis-Edouard LAFONTANT  

## Informations importantes

!!! info "Dates importantes"
    - **Description du projet** : 16 mai 2025
    - **Foire 1: Prototypage** : 9-13 juin 2025
    - **Foire 2: Version beta** : 14-18 juillet 2025
    - **Présentation et rapport** : 11-15 août 2025

## Équipe

- Lallia Diakité: Responsable de...
- Marc Olivier Jean Paul: Responsable de...

## Description du projet

### Contexte

La création de jeux vidéo est aujourd'hui facilitée par des plateformes telles que Scratch, Unity Playground, ou Gamefroot. Celles-ci proposent des interfaces simplifiées, souvent basées sur le "glisser-déposer" (drag-and-drop), permettant aux jeunes ou aux novices de concevoir des jeux sans écrire de code. Cependant, ces outils restent parfois limités dans la personnalisation ou la profondeur des mécaniques de jeu qu'ils permettent de développer.

Parallèlement, la technologie NFC (Near Field Communication) gagne en popularité dans le domaine du jeu vidéo. On la retrouve notamment dans les figurines Amiibo de Nintendo qui permettent de débloquer du contenu dans certains jeux, ou encore dans des cartes interactives utilisées dans les escape games ou les jeux éducatifs. Cette technologie permet d'ajouter une dimension physique et tangible à l'expérience vidéoludique.

### Problématique ou motivations

Actuellement, il existe de nombreuses plateformes de création de jeux-vidéos,
Mais elles présentent plusieurs problèmatiques :
    - Complexité excessive pour les jeunes utilisateurs : des outils comme Unity ou Construct, bien que puissants, peuvent décourager les débutant par leur interface technique;
    - Peu d'interactivité physique: Peu de plateformes permettent l'intégration de composants physiques comme les cartes NFC, réservées aux jeux commerciaux complexes;
    - Accessibilité limitée: Certaines plateformes ne sont pas compatibles avec les appareils mobiles ou nécessitent des installations complexes.
Nous cherchons donc à répondre à ces enjeux en proposant une solution:
    - Accessible et intuitive, pour permettre aux jeunes de concevoir leur jeux sans connaissances préalables;
    - Originale grâce aux cartes NFC pour enrichir l'expérience de jeu;
    - Favorisant la créativité des jeunes.

### Proposition et objectifs

Nous proposons de créer ZayLou Games une plateforme de création de
jeux vidéo, pour laquelle nous aurons à :
    - Créer une plateforme plateforme web pour la création de jeux 2D accessible aux non-développeurs grâce à une interface drag-and-drop;
    - Créer une application mobile pour l'exécution des jeux;
    - Intégrer l'utilisation de cartes NFC permettant de déclencher des effets en jeu;
    - Simuler un effet de profondeur, sasn recourir à la manipulation directe de modèles 3D;
    - Nous assurer que le jeu créé peut être sauvegardé et joué sur une application mobile compatible.

#### Cartes et puces NFC

- Les utilisateurs peuvent scanner des cartes NFC pour déclencher des effets dans le jeu (bonus, malus, surprises);
- Les cartes contiennent des puces NFC (Near Field Communication);
- Chaque puce stocke un fichier JSON décrivant les effets associés;
- Ces fichiers sont lus par la plateforme pour appliquer les effets au jeu.

#### Langage de programmation

Le développement sera divisé entre:
    - Front-end:
        - Utilisation de React Native, une bibliothèque JavaScript pour créer des interfaces mobiles et web;
        - Une seule base de code pour plusieurs plateformes;
        - Chaque puce stocke un fichier JSON décrivant les effets associés;
        - Création d'une interface intuitive et réutilisable grâce aux composants.
    - Back-end:
        - Utilisation de Node.js, environnement d’exécution JavaScript côté serveur;
        - Parfait pour les applications en temps réel;
        - Chaque puce stocke un fichier JSON décrivant les effets associés;
        - Intégration facile avec MongoDB (base NoSQL) pour la gestion des données utilisateurs et des jeux.
    - WebSockets:
        - Gérer la communication en temps réel entre le front-end et le back-end;
        - Permettre aux utilisateurs de jouer en ligne et d'interagir avec les jeux créés;
        - Offrir une expérience fluide et réactive.

## Échéancier

!!! info
    Le suivi complet est disponible dans la page [Suivi de projet](suivi.md).

| Jalon (*Milestone*)            | Date prévue   | Livrable                            | Statut      |
|--------------------------------|---------------|-------------------------------------|-------------|
| Ouverture de projet            | 1 mai         | Proposition de projet               | ✅ Terminé  |
| Analyse des exigences          | 16 mai        | Document d'analyse                  | 🔄 En cours |
| Prototype 1                    | 23 mai        | Maquette + Flux d'activités         | ⏳ À venir  |
| Prototype 2                    | 30 mai        | Prototype finale + Flux             | ⏳ À venir  |
| Architecture                   | 30 mai        | Diagramme UML ou modèle C4          | ⏳ À venir  |
| Modèle de donneés              | 6 juin        | Diagramme UML ou entité-association | ⏳ À venir  |
| Revue de conception            | 6 juin        | Feedback encadrant + ajustements    | ⏳ À venir  |
| Implémentation v1              | 20 juin       | Application v1                      | ⏳ À venir  |
| Implémentation v2 + tests      | 11 juillet    | Application v2 + Tests              | ⏳ À venir  |
| Implémentation v3              | 1er août      | Version finale                      | ⏳ À venir  |
| Tests                          | 11-31 juillet | Plan + Résultats intermédiaires     | ⏳ À venir  |
| Évaluation finale              | 8 août        | Analyse des résultats + Discussion  | ⏳ À venir  |
| Présentation + Rapport         | 15 août       | Présentation + Rapport              | ⏳ À venir  |
