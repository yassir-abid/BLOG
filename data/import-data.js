require('dotenv').config();

const debug = require('debug')('import:log');

const categories = require('./categories.json');
const posts = require('./posts.json');

const client = require('../app/config/db');

(async () => {
    debug('Clean table');

    /**
     * Clean tables before reloading data
     * RESTART IDENTITY (optional) reset the numbering of the IDENTITY columns
     */
    await client.query('TRUNCATE TABLE category, post RESTART IDENTITY');

    const categoryQueries = [];

    categories.forEach((category) => {
        debug('Processing category:', category.label);
        const query = client.query(
            `
                INSERT INTO "category"
                ("label", "route")
                VALUES
                ($1, $2)
                RETURNING *;
            `,
            [category.label, category.route],
        );
        debug('Query content', query);
        categoryQueries.push(query);
    });

    const results = await Promise.all(categoryQueries);
    debug('Results content', results);

    /**
     * For each result object we extract the content of rows[0] which refers to a category
     * in order to link posts and categories
     */
    const categoryRows = results.map((result) => result.rows[0]);
    debug('CategoryRows content', categoryRows);

    const postQueries = [];
    posts.forEach((post) => {
        debug('Processing post:', post.slug);

        const postCategory = categoryRows.find((category) => category.label === post.category);

        const insertPostQuery = {
            text: `
                INSERT INTO "post"
                ("slug", "title", "excerpt", "content", "category_id")
                VALUES
                ($1, $2, $3, $4, $5)
            `,
            values: [
                post.slug,
                post.title,
                post.excerpt,
                post.content,
                postCategory.id,
            ],
        };

        const query = client.query(insertPostQuery);
        postQueries.push(query);
    });

    await Promise.all(postQueries);

    debug('Done');
})();
