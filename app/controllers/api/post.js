const debug = require('debug')('PostController');

const fetch = require('node-fetch');

const postDataMapper = require('../../models/post');
const categoryDataMapper = require('../../models/category');
const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
    /**
     * Post controller to get all records.
     * ExpressMiddleware signature
     * @param {object} _ Express req.object (not used)
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async getAll(_, res) {
        debug('getAll');
        const posts = await postDataMapper.findAll();
        return res.json(posts);
    },

    /**
     * Post controller to get a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async getOne(req, res) {
        debug('getOne');
        const post = await postDataMapper.findByPk(req.params.id);

        if (!post) {
            throw new ApiError('Post not found', { statusCode: 404 });
        }

        return res.json(post);
    },

    /**
     * Post controller to get all records of specific category.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async getByCategoryId(req, res) {
        debug('getByCategoryId');
        const category = await categoryDataMapper.findByPk(req.params.id);
        if (!category) {
            throw new ApiError('Category not found', { statusCode: 404 });
        }
        const posts = await postDataMapper.findByCategoryId(req.params.id);
        return res.json(posts);
    },

    /**
     * Post controller to create a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async create(req, res) {
        debug('create');
        const post = await postDataMapper.isUnique(req.body);
        if (post) {
            let field;
            if (post.slug === req.body.slug) {
                field = 'slug';
            } else {
                field = 'title';
            }
            throw new ApiError(`Post already exists with this ${field}`, { statusCode: 400 });
        }

        const category = await categoryDataMapper.findByPk(req.body.category_id);

        if (!category) {
            throw new ApiError('Category not found', { statusCode: 404 });
        }

        const response = await fetch(`https://foodish-api.herokuapp.com/api/images/${category.label.toLowerCase()}`);
        const json = await response.json();

        let illustration;
        if (json.image) {
            illustration = json.image;
        } else {
            illustration = 'https://cdn.pixabay.com/photo/2014/06/11/17/00/food-366875_960_720.jpg';
        }

        req.body.picture = illustration;

        const savedPost = await postDataMapper.insert(req.body);
        return res.json(savedPost);
    },

    /**
     * Post controller to update a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async update(req, res) {
        debug('update');
        const post = await postDataMapper.findByPk(req.params.id);
        if (!post) {
            throw new ApiError('This post does not exists', { statusCode: 404 });
        }

        if (req.body.slug || req.body.title) {
            const existingPost = await postDataMapper.isUnique(req.body, req.params.id);
            if (existingPost) {
                let field;
                if (existingPost.slug === req.body.slug) {
                    field = 'slug';
                } else {
                    field = 'title';
                }
                throw new ApiError(`Other post already exists with this ${field}`, {
                    statusCode: 400,
                });
            }
        }

        if (req.body.category_id) {
            const category = await categoryDataMapper.findByPk(req.body.category_id);

            if (!category) {
                throw new ApiError('Category not found', { statusCode: 404 });
            }

            const response = await fetch(`https://foodish-api.herokuapp.com/api/images/${category.label.toLowerCase()}`);
            const json = await response.json();

            let illustration;
            if (json.image) {
                illustration = json.image;
            } else {
                illustration = 'https://cdn.pixabay.com/photo/2014/06/11/17/00/food-366875_960_720.jpg';
            }

            req.body.picture = illustration;
        }

        const savedPost = await postDataMapper.update(req.params.id, req.body);
        return res.json(savedPost);
    },

    /**
     * Post controller to delete a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async delete(req, res) {
        debug('delete');
        const post = await postDataMapper.findByPk(req.params.id);
        if (!post) {
            throw new ApiError('This post does not exists', { statusCode: 404 });
        }

        await postDataMapper.delete(req.params.id);
        return res.status(204).json();
    },
};
