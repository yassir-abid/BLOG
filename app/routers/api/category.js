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

router
    .route('/:id(\\d+)')
    /**
     * GET /api/categories/{id}
     * @summary Get one category
     * @tags Category
     * @param {number} id.path.required - category identifier
     * @return {Category} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - Category not found - application/json
     */
    .get(controllerHandler(controller.getOne));

module.exports = router;
