
# IronInsight

## Introduction
**IronInsight** est un projet collaboratif entre [Raphaël Azevedo](https://github.com/RaphaelAZ) et [Félix Viart](https://github.com/ViartFelix).
Ce project consiste en un back-end en ExpressJS et un front-end en AngluarJS. Ces deux éléments ont été codés principalement en TypeScript.

## Préparation
Avant de d'installer les dépendances, il est nécessaire d'avoir un fichier ``.env`` à la racine du dossier 'back/'.
Ce fichier doit contenir les informations suivantes:

- DB_HOST
- DB_USER
- DB_PASS
- DB_NAME
- JWT_SECRET

Un exemple de fichier ``.env``:
```.env
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=ironinsight

JWT_SECRET=9c389bc147026a14fa2c5920dc17c0da66e36bc35f1d4d0033929aab65531955
```

## Démarrage
Une fois le projet cloné, préparez l'installation en suivant les prérequis

### Prérequis
  - Une base de données nommée "iron_insight"
  - Importer la structure de base de données via "iron_insight.sql" situé à la racine du projet

### Commandes
Une fois les prérequis installés, vous pouvez coller ces commandes dans le terminal de votre choix et dans le bon répertoire:

#### Répertoire backend :
```shell
npm install --legacy-peer-deps
"Installing packages...";
```

```shell
npm run start
"Connexion avec la base de données...";
```

#### Répertoire frontend :
```shell
npm install --legacy-peer-deps
"Installing packages...";
```

```shell
npm run start
"Application generation complete...";
```

### Lancement
Après avoir installé les dépendances et démarré le projet rendez-vous sur l'URL localhost:4200 !
