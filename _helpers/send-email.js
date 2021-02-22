const nodemailer = require('nodemailer');
// const config = require('config.json');

module.exports = sendEmail;

const smtpOptions = {
  "host": "smtp.ethereal.email",
  "port": 587,
  "auth": {
    "user": process.env.smtp_user || require('config.json').smtpUser,
    "pass": process.env.smtp_pass || require('config.json').smtpPass
  }
}

async function sendEmail({ to, subject, html, from = "localhost@salmiakmedia.se" }) {
    const transporter = nodemailer.createTransport(smtpOptions);
    await transporter.sendMail({ from, to, subject, html });
    // console.log({to, subject, html}) // eslint-disable-line no-console
}
