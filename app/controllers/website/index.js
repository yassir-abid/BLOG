const debug = require('debug')('WebsiteController');
const path = require('path');

const websiteController = {
    /**
     * Home controller which display posts List.
     * ExpressMiddleware signature
     * @param {object} _ Express request object (not used)
     * @param {object} res Express response object
     * @returns {string} posts List html page
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

    /**
     * Home controller which display about page.
     * ExpressMiddleware signature
     * @param {object} _ Express request object (not used)
     * @param {object} res Express response object
     * @returns {file} about html page
     */
    about(_, res) {
        debug('about');
        res.sendFile(path.join(__dirname, '../../../public/html/about.html'));
    },

    /**
     * Home controller which display contact page.
     * ExpressMiddleware signature
     * @param {object} _ Express request object (not used)
     * @param {object} res Express response object
     * @returns {file} contact html page
     */
    contact(_, res) {
        debug('contact');
        res.sendFile(path.join(__dirname, '../../../public/html/contact.html'));
    },
};

module.exports = { websiteController };
