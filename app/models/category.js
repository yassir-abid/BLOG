const client = require('../config/db');

/**
 * @typedef {object} Category
 * @property {number} id - Table PK
 * @property {string} route - Category URL
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
};
