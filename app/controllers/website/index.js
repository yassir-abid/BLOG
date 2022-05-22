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
        res.sendFile(path.join(__dirname, '../../../public/html/postsList.html'));
    },
};

module.exports = { websiteController };
