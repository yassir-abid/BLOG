const postDataMapper = require('../../models/post');
const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
    /**
     * Post controller to get all records.
     * ExpressMiddleware signature
     * @param {object} _ Express req.object (not used)
     * @param {object} res Express response object
     * @returns {array<Post>} Route API JSON response
     */
    async getAll(_, res) {
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
        const post = await postDataMapper.findByPk(req.params.id);

        if (!post) {
            throw new ApiError('Post not found', { statusCode: 404 });
        }

        return res.json(post);
    },

    /**
     * Post controller to create a record.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async create(req, res) {
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

        const savedPost = await postDataMapper.insert(req.body);
        return res.json(savedPost);
    },
};
