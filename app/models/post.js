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

/**
 * @typedef {object} InputPost
 * @property {string} slug - Post URL
 * @property {string} title - Post title
 * @property {string} excerpt - Post excerpt
 * @property {string} content - Post content
 * @property {number} category_id - Id of the category linked to the post
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

    /**
     * Add post in the database
     * @param {InputPost} post - Data to insert
     * @returns {Post} - Inserted post
     */
    async insert(post) {
        const savedPost = await client.query(
            `
        INSERT INTO post
        (slug, title, excerpt, content, category_id) VALUES
        ($1, $2, $3, $4, $5) RETURNING *
      `,
            [post.slug, post.title, post.excerpt, post.content, post.category_id],
        );

        return savedPost.rows[0];
    },

    /**
     * Checks if a post already exists with the same title or slug
     * @param {object} inputData - Data provided
     * @param {number} postId - Post id (optional)
     * @returns {(Post|undefined)} - The existing post
     * or undefined if no post exists with this data
     */
    async isUnique(inputData, postId) {
        const fields = [];
        const values = [];
        Object.entries(inputData).forEach(([key, value], index) => {
            if (['slug', 'title'].includes(key)) {
                fields.push(`"${key}" = $${index + 1}`);
                values.push(value);
            }
        });

        const preparedQuery = {
            text: `SELECT * FROM post_with_category WHERE (${fields.join(' OR ')})`,
            values,
        };

        if (postId) {
            preparedQuery.text += ` AND id <> $${values.length + 1}`;
            preparedQuery.values.push(postId);
        }
        const result = await client.query(preparedQuery);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },
};
