const express = require('express');

const { categoryController: controller } = require('../../controllers/api');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
    /**
     * GET /api/categories
     * @summary Get all categories
     * @tags Category
     * @return {[Category]} 200 - success response - application/json
     */
    .get(controllerHandler(controller.getAll));

module.exports = router;
