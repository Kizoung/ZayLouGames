# ZayLouGames

Site web du projet: https://github.com/Kizoung/ZayLouGames.git


# Lien
http://localhost:3000


# Organisaton de mes fichiers 

| Couche            | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| Modèle (Core)     | Représente les entités du jeu (Jeu, Joueur, Carte, etc.)     |
| Contrôleur        | Gère la logique métier (scan de carte, effets, déplacements) |
| Vue/UI            | Interface utilisateur React Native                           |
| Services          | Applique des actions spécifiques (Effets, collisions, etc.)  |
| Stockage          | Sauvegarde/chargement local ou en ligne                      |


Le fichier Core contiendra les classes du modèle (jeu, joueur ...), le fichier controllers sera pour la gestion du jeu, et des logiques, le fichier services contiendra tout par rapport aux effets, aux animations ,règle et collision, Dans views on aura les composants React Native, Storage sera pour la gestion de sauvegarde et chargement et Data les fichiers JSON (effets, cartes NFC)

# Choix de Types script au lieu de javascript sous conseil

Types script a été créé pour la POO et surtout on peut compiler .js avec typescript

.tsx = Typescript + JSX

Les fichiers .tsx sont pour des composants React/ React Native qui retournent du JSX (balises HTML-like dans du code)
