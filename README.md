# FOOD BLOG

This blog project is based on:

- REST API using NodeJS, Express and PostgreSQL
- basic front in html, css and JavaScript (all files are grouped in the `public` folder)

## [See app website](https://blog-delices.herokuapp.com/)

## App launch

1- After cloning the project and from the project directory, run: `npm install`

2- Create a Postgresql database

3- Install **[Sqitch](https://sqitch.org/)**

*For Debian: `sudo apt-get install sqitch libdbd-pg-perl postgresql-client libdbd-sqlite3-perl sqlite3`*

4- Create files:

- `.env`
- `sqitch.conf`  for the sqitch migrations

5- Run `sqitch deploy`, then `sqitch verify`.

6- Run the seeding script: `node data/import-data.js`

7- Run the following script to launch app: `npm run dev`

## Endpoints

### WEBSITE

- `GET /` home page with posts list
- `GET /posts` post page
- `GET /about` about page
- `GET /contact` contact form
- `POST /contact` handles contact form and sending email

### API REST

**Posts**:

- `GET /api/posts` retrieves all posts from database
- `GET /api/posts/:id` retrieves one post from database by _id_
- `GET /api/posts/category/:id` retrieves all posts from database for a specific category
- `POST /api/posts` create a new post
- `PATCH /api/posts/:id` update an existing post
- `DELETE /api/posts/:id` remove a post

**Categories**:

- `GET /api/categories` retrieves all categories from database
- `GET /api/categories/:id` retrieves one category from database by _id_
- `POST /api/categories` create a new category
- `PATCH /api/categories/:id` update an existing category
- `DELETE /api/categories/:id` remove a category

**Documentation**:

- `GET /api/` API documentation link

For ids, we use an Express feature, URL parameters validation by regular expressions! More informations [here](https://expressjs.com/en/guide/routing.html#route-parameters).

## Focus on REST API

### Architecture

- Organized Routers
- Organized Controllers
- DataMappers (by entity) to query database
- Sending emails with nodemailer
- Consuming external APIs with node-fetch
- Error handling using custom errors and modul
- Debug and error logs with Bunyan
- Data validation by JOI schemas
- Swagger documentation
- Eslint

### Conception

API CDM is availble in the `conception` folder.

### DataBase Management System (DBMS)

This API uses PostgreSQL DBMS.
The DDL is implemented with sqitch migrations. All migrations are available in the `migrations` folder.

### Seeding

JSON seeding is avaible in `data` folder.
`import-data.js` file import data to database.

Running `npm run resetDB` script allows to implement DDL and launch Database seeding.
