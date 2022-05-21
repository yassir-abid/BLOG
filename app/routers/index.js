const express = require('express');

const apiRouter = require('./api');
const websiteRouter = require('./website');

const router = express.Router();

router.use('/api', apiRouter);
router.use('/', websiteRouter);

module.exports = router;
