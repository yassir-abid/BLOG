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
     * @returns {array<Category>} Route API JSON response
     */
    async getOne(req, res) {
        const category = await categoryDataMapper.findByPk(req.params.id);

        if (!category) {
            throw new ApiError('Category not found', { statusCode: 404 });
        }

        return res.json(category);
    },

    /**
     * Category controller to create a record.
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns {Category} Route API JSON response
     */
    async create(req, res) {
        const category = await categoryDataMapper.isUnique(req.body);
        if (category) {
            let field;
            if (category.label === req.body.label) {
                field = 'label';
            } else {
                field = 'route';
            }
            throw new ApiError(`Category already exists with this ${field}`, { statusCode: 400 });
        }

        const savedCategory = await categoryDataMapper.insert(req.body);
        return res.json(savedCategory);
    },

    /**
     * Category controller to update a record.
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async update(req, res) {
        const category = await categoryDataMapper.findByPk(req.params.id);
        if (!category) {
            throw new ApiError('This category does not exists', { statusCode: 404 });
        }

        if (req.body.label || req.body.route) {
            const existingCategory = await categoryDataMapper.isUnique(req.body, req.params.id);
            if (existingCategory) {
                let field;
                if (existingCategory.label === req.body.label) {
                    field = 'label';
                } else {
                    field = 'route';
                }
                throw new ApiError(`Other category already exists with this ${field}`, {
                    statusCode: 400,
                });
            }
        }

        const savedCategory = await categoryDataMapper.update(req.params.id, req.body);
        return res.json(savedCategory);
    },

    /**
     * Category controller to delete a record.
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns {string} Route API JSON response
     */
    async delete(req, res) {
        const category = await categoryDataMapper.findByPk(req.params.id);
        if (!category) {
            throw new ApiError('This category does not exists', { statusCode: 404 });
        }

        await categoryDataMapper.delete(req.params.id);
        return res.status(204).json();
    },
};
