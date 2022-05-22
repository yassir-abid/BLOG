const express = require('express');

const controllerHandler = require('../../helpers/controllerHandler');
const { websiteController } = require('../../controllers/website');

const { WebsiteError } = require('../../helpers/errorHandler');

const router = express.Router();

router.use((_, res, next) => {
    res.type('html');
    next();
});

router.get('/', websiteController.home);
router.get('/posts', websiteController.post);
router.get('/about', websiteController.about);
router.get('/contact', websiteController.contact);
router.post('/contact', controllerHandler(websiteController.contactMessage));

router.use(() => {
    throw new WebsiteError('Page introuvable', { statusCode: 404 });
});

module.exports = router;
