const debug = require('debug')('WebsiteController');
const path = require('path');
const sendContactMessage = require('../../helpers/email');

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
     * @returns {string} about html page
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
     * @returns {string} contact html page
     */
    contact(_, res) {
        debug('contact');
        res.sendFile(path.join(__dirname, '../../../public/html/contact.html'));
    },

    /**
     * Home controller which handle contact form by sending an email.
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns {boolean} 200 - success response - application/json
     */
    async contactMessage(req, res) {
        debug('contactMessage');
        const result = await sendContactMessage(req.body.name, req.body.email, req.body.message);
        return res.json(result);
    },
};

module.exports = { websiteController };
