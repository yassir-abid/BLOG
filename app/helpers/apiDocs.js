const expressJSDocSwagger = require('express-jsdoc-swagger');

/**
 * expressJSDocSwagger configuration
 */
const options = {
    info: {
        version: '1.0.0',
        title: 'BLOG API',
        description: 'API REST for blogging',
    },
    baseDir: __dirname,
    filesPattern: ['../routers/**/*.js', '../errors/*.js', '../models/*.js'],
    swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE,
    exposeApiDocs: true,
    apiDocsPath: '/api/docs',
};

/**
 * Swagger middleware factory
 * @param {object} app Express application
 * @returns {object} Express JSDoc Swagger middleware that create web documentation
 */
module.exports = (app) => expressJSDocSwagger(app)(options);
