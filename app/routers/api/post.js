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

module.exports = router;
