# Projet Web - Blog

Ce projet est un blog développé dans le cadre d'un projet Web. Il permet aux utilisateurs de lire et créer des articles et des commentaires. Le projet est divisé en parties Backend et Frontend, avec des technologies spécifiques utilisées pour chaque partie.

## Technologies utilisées

- Backend :
  - Node.js avec Express
  - Prisma pour la gestion de la persistance des données
  - Base de données MySQL
- Frontend :
  - React pour la création de l'interface utilisateur
  - Tailwind CSS pour le stylisme des composants
  - Axios pour les appels API

## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Accédez au dossier backend(dossier principale) et exécutez la commande `npm install` pour installer les dépendances.
3. Accédez au dossier client et exécutez la commande `npm install` pour installer les dépendances.

## Configuration
1. Créez un dossier nommé "config" à la racine du projet.

2. À l'intérieur du dossier "config", créez un fichier nommé "default.json" et ajoutez-y les configurations par défaut nécessaires pour votre application :

{
    "jwtPrivateKey": ""
}
3. Créez un fichier nommé "custom-environment-variables.json" à l'intérieur du dossier "config" et configurez les variables d'environnement correspondantes pour chaque propriété de configuration:

{
    "jwtPrivateKey": "blog_jwtPrivateKey"
}

### Backend

1. Créez un fichier `.env` dans le dossier backend et configurez les variables d'environnement suivantes :
DATABASE_URL="mysql://root:@localhost:3306/projet-web"

2. Exécutez la commande `npx prisma migrate dev` pour exécuter les migrations de la base de données.
4. Utilisez la commande suivante pour configurer les variables d'environnement nécessaires pour JWT :

npm config set blog_jwtPrivateKey blogSecureKey


## Exécution

1. Accédez au dossier backend et exécutez la commande `npm run start-dev` pour démarrer le serveur backend.
2. Accédez au dossier frontend et exécutez la commande `npm start` pour démarrer l'application frontend.

## Fonctionnalités

- Création et lecture d'articles.
- Attribution des articles à des catégories.
- Ajout de commentaires sur les articles.
- Authentification des utilisateurs.

