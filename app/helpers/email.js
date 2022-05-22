const nodemailer = require('nodemailer');

const sendContactMessage = async (name, email, message) => new Promise((resolve) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        tls: {
            rejectUnauthorized: false,
        },
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
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
