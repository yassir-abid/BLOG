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
};
