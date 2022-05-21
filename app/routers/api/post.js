const express = require('express');

const { postController: controller } = require('../../controllers/api');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
    /**
     * GET /api/posts
     * @summary Get all posts
     * @tags Post
     * @return {array<Post>} 200 - success response - application/json
     */
    .get(controllerHandler(controller.getAll));

router
    .route('/:id(\\d+)')
    /**
     * GET /api/posts/{id}
     * @summary Get one post
     * @tags Post
     * @param {number} id.path.required - post identifier
     * @return {Post} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - Post not found - application/json
     */
    .get(controllerHandler(controller.getOne));

module.exports = router;
