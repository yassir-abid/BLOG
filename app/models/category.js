const client = require('../config/db');

/**
 * @typedef {object} Category
 * @property {number} id - Table PK
 * @property {string} route - Category URL
 * @property {string} label - The displayable name of the category
 */

/**
 * @typedef {object} InputCategory
 * @property {string} route - URL segment to access the category
 * @property {string} label - The displayable name of the category
 */

module.exports = {
    /**
     * @returns {Category[]} - All categories of the database
     */
    async findAll() {
        const result = await client.query('SELECT * FROM category');
        return result.rows;
    },

    /**
     * Find category by id
     * @param {number} categoryId - id of the desired category
     * @returns {(Category|undefined)} -
     * The desired category or undefined if no category found with this id
     */
    async findByPk(categoryId) {
        const result = await client.query('SELECT * FROM category WHERE id = $1', [categoryId]);

        if (result.rowCount === 0) {
            return undefined;
        }

        return result.rows[0];
    },

    /**
     * Add category in the database
     * @param {InputCategory} category - Data to insert
     * @returns {Category} - Inserted category
     */
    async insert(category) {
        const savedCategory = await client.query(
            `
                INSERT INTO category
                (label, route) VALUES
                ($1, $2) RETURNING *
            `,
            [category.label, category.route],
        );

        return savedCategory.rows[0];
    },

    /**
     * Update category
     * @param {number} id - id of the category to update
     * @param {InputCategory} category - Data to update
     * @returns {Category} - Updated category
     */
    async update(id, category) {
        const fields = Object.keys(category).map((prop, index) => `"${prop}" = $${index + 1}`);
        const values = Object.values(category);

        const savedCategory = await client.query(
            `
                UPDATE category SET
                    ${fields}
                WHERE id = $${fields.length + 1}
                RETURNING *
            `,
            [...values, id],
        );

        return savedCategory.rows[0];
    },

    /**
     * Checks if a category already exists with the same label or route
     * @param {object} inputData - Data provided
     * @param {number} categoryId - Category id (optional)
     * @returns {(Category|undefined)} - The existing category
     * or undefined if no category exists with this data
     */
    async isUnique(inputData, categoryId) {
        const fields = [];
        const values = [];
        Object.entries(inputData).forEach(([key, value], index) => {
            if (['label', 'route'].includes(key)) {
                fields.push(`"${key}" = $${index + 1}`);
                values.push(value);
            }
        });

        const preparedQuery = {
            text: `SELECT * FROM category WHERE (${fields.join(' OR ')})`,
            values,
        };

        if (categoryId) {
            preparedQuery.text += ` AND id <> $${values.length + 1}`;
            preparedQuery.values.push(categoryId);
        }
        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },
};
