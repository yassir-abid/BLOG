const express = require('express');

const categoryRouter = require('./category');
const postRouter = require('./post');
const { apiController } = require('../../controllers/api');

const { ApiError } = require('../../helpers/errorHandler');

const router = express.Router();

router.use((_, res, next) => {
    res.type('json');
    next();
});

router.all('/', apiController.home);

router.use('/categories', categoryRouter);
router.use('/posts', postRouter);

router.use(() => {
    throw new ApiError('API Route not found', { statusCode: 404 });
});

module.exports = router;
