const path = require('path');
const cors = require('cors');
const express = require('express');
const multer = require('multer');

const forms = multer();

const router = require('./routers');

const app = express();

// expressJSDocSwagger
require('./helpers/apiDocs')(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware to parse JSON payload
app.use(express.json());
// Middleware to parse urlencoded payload
app.use(express.urlencoded({ extended: true }));
// Middleware to parse multipart/form-data
app.use(forms.array());

app.use(cors({
    origin: process.env.CORS_DOMAINS ?? '*',
}));

app.use(router);

module.exports = app;
