const express = require('express');

const { websiteController } = require('../../controllers/website');

const { WebsiteError } = require('../../helpers/errorHandler');

const router = express.Router();

router.use((_, res, next) => {
    res.type('html');
    next();
});

router.get('/', websiteController.home);

router.use(() => {
    throw new WebsiteError('Page introuvable', { statusCode: 404 });
});

module.exports = router;
