const categoryDataMapper = require('../../models/category');

module.exports = {
    /**
     * Category controller to get all records.
     * ExpressMiddleware signature
     * @param {object} _ Express request object (not used)
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async getAll(_, res) {
        const categories = await categoryDataMapper.findAll();
        return res.json(categories);
    },
};
