const express = require('express');

const { websiteController } = require('../../controllers/website');

const router = express.Router();

router.use((_, res, next) => {
    res.type('html');
    next();
});

router.get('/', websiteController.home);

module.exports = router;
