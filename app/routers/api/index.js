const express = require('express');

const { apiController } = require('../../controllers/api');

const router = express.Router();

router.use((_, res, next) => {
    res.type('json');
    next();
});

router.all('/', apiController.home);

module.exports = router;
