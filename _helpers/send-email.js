const nodemailer = require('nodemailer');
// const config = require('config.json');

module.exports = sendEmail;

async function sendEmail({ to, subject, html, from = "localhost@salmiakmedia.se" }) {
    // const transporter = nodemailer.createTransport(config.smtpOptions);
    // await transporter.sendMail({ from, to, subject, html });
    console.log({to, subject, html}) // eslint-disable-line no-console
}
