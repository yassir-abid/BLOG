const categoryDataMapper = require('../../models/category');
const { ApiError } = require('../../helpers/errorHandler');

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

    /**
     * Category controller to get a record.
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async getOne(req, res) {
        const category = await categoryDataMapper.findByPk(req.params.id);

        if (!category) {
            throw new ApiError('Category not found', { statusCode: 404 });
        }

        return res.json(category);
    },
};
