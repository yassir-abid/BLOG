/**
 * Module to send email throught Gmail Account
 * Many of solutions required to go into my account settings and Enable Less Secure Apps
 * Here, another method is used: setting up OAuth2 for a Google Developer application
 * and connecting it to this module using SMTP
 */

const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const { OAuth2 } = google.auth;

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID, // ClientID of the Google Developer project
    process.env.CLIENT_SECRET, // Client Secret of the Google Developer project
    'https://developers.google.com/oauthplayground', // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
});
const accessToken = oauth2Client.getAccessToken();

const sendContactMessage = async (name, email, message) => new Promise((resolve) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        tls: {
            rejectUnauthorized: false,
        },
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_ADDRESS,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken,
        },
    });

    const options = {
        from: process.env.EMAIL_ADDRESS,
        to: process.env.EMAIL_ADDRESS,
        subject: `Message de la part de ${name}: ${email}`,
        text: message,
    };
    transporter.sendMail(options, (error) => {
        if (error) {
            resolve(false);
        } else {
            resolve(true);
        }
    });
});

module.exports = sendContactMessage;
