const postDataMapper = require('../../models/post');

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
};
