const debug = require('debug')('WebsiteController');
const path = require('path');

const websiteController = {
    /**
     * Home controller which display posts List.
     * ExpressMiddleware signature
     * @param {object} _ Express request object (not used)
     * @param {object} res Express response object
     * @returns {string} html page of posts List
     */
    home(_, res) {
        debug('home');
        res.sendFile(path.join(__dirname, '../../../public/html/postsList.html'));
    },
    /**
     * Home controller which display post detail.
     * ExpressMiddleware signature
     * @param {object} _ Express request object (not used)
     * @param {object} res Express response object
     * @returns {string} post detail html page
     */
    post(_, res) {
        debug('post');
        res.sendFile(path.join(__dirname, '../../../public/html/post.html'));
    },
};

module.exports = { websiteController };
