const client = require('../config/db');

/**
 * @typedef {object} Post
 * @property {number} id - Table PK
 * @property {string} slug - Post URL
 * @property {string} title - Post title
 * @property {string} excerpt - Post excerpt
 * @property {string} content - Post content
 * @property {number} category_id - Id of the category linked to the post
 * @property {string} category - Label of the category linked to the post
 */

module.exports = {
    /**
     * @returns {Post[]} - All posts of the database
     */
    async findAll() {
        const result = await client.query('SELECT * FROM post_with_category');
        return result.rows;
    },
};
