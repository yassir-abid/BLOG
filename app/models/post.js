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

    /**
     * Find post by id
     * @param {number} postId - id of the desired post
     * @returns {(Post|undefined)} - The desired post or undefined if no post found with this id
     */
    async findByPk(postId) {
        const result = await client.query('SELECT * FROM post_with_category WHERE id = $1', [postId]);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },
};
