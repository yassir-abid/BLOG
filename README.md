# FOOD BLOG


Ce projet présente un exemple de blog basé sur:

- une API REST en NodeJS, Express et PostgreSQL
- un front basique en html, css et JavaScript dont les fichiers sont regroupés dans le dossier public (à la racine du projet)

## Lancement du projet

Après avoir cloner le projet et à partir du répertoire du projet:

- `npm install`

Création des fichiers:

- `.env`
- `sqitch.conf`  pour les migrations sqitch

Exécution du script:

- `npm run dev`

## Endpoints

### WEBSITE

- `GET /` pour afficher la page d'accueil avec la liste de tous les articles
- `GET /posts` pour afficher la page d'un article
- `GET /about` pour afficher la page "A propos"
- `GET /contact` pour afficher le formulaire de contact
- `POST /contact` pour gérer le formulaire de contact et l'envoi du mail

### API REST

**Posts**:

- `GET /api/posts` pour afficher la liste des articles dans notre base de données
- `GET /api/posts/:id` pour afficher un unique article à partir de son _id_
- `GET /api/posts/category/:id` idem mais pour n'afficher que les articles d'une catégorie précise
- `POST /api/posts` pour créer un article avec validation des données
- `PATCH /api/posts/:id` pour modifier un article avec validation des données
- `DELETE /api/posts/:id` pour supprimer un article

**Categories**:

- `GET /api/categories` pour afficher la liste des catégories dans notre base de données
- `GET /api/categories/:id` pour afficher une catégorie à partir de son _id_
- `POST /api/categories` pour créer une catégorie avec validation des données
- `PATCH /api/categories/:id` pour modifier une catégorie avec validation des données
- `DELETE /api/categories/:id` pour supprimer une catégorie avec validation des données

**Documentation**:

- `GET /api/` pour afficher le lien vers la documentation de l'API

Pour être sur que _id_ a bien la forme d'un id (donc un nombre), on utilise une feature d'Express : la validation des paramètres d'URL via les expressions régulières ! Plus d'info [par ici](https://expressjs.com/en/guide/routing.html#route-parameters).

## Focus BACK

### Architecture de l'API REST

- Routeurs organisés
- Controllers organisés
- Lien avec la Base De Données est fait via des dataMappers (par entité)
- Gestion de l'envoi des mails avec NodeMailer
- Lien avec les API externe avec node-fetch
- Gestion des erreurs avec des erreurs et un module custom
- Debug et logs d'erreurs avec Bunyan
- Validation des données par JOI
- Documentation Swagger
- Eslint

### Conception

Le MCD de l'API est disponible dans le dossier `conception`.

### Système de gestion de bases de données (SGBD)

L'API est basé sur un SGBDR Postgresql.
Le DDL est géré par des migrations sqitch. Toutes les migrations sont disponibles dans le dossier `migrations`.

### Seeding

Un seeding en JSON est disponible dans le dossier `data`.
Le script `import-data.js` permet d'implémenter les datas dans la Base De Données.

Pour implémenter le DDL et le seeding, un script est disponible: `npm run resetDB`

## Focus Front

### Architecture

Les fichiers sont regroupés dans des sous-dossiers du dossier public (à la racine du projet).

**Sous-dossier html**:
Un fichier html par endpoint et des fichiers pour les erreurs

**Sous-dossier css**:
Un fichier css pour toute l'application

**Sous-dossier js**:
Un fichier js par endpoint consommant des données de l'API
