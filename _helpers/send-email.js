const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
// const config = require('config.json');

const readHTMLFile = function(path, callback) {
  fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
    if (err) {
      throw err;
      callback(err);
    }
    else {
      callback(null, html);
    }
  });
};

const emailFrom = process.env.email_from || require('config.json').emailFrom

const smtpOptions = {
  "host": process.env.smtp_host || require('config.json').smtpHost,
  "port": 587,
  "auth": {
    "user": process.env.smtp_user || require('config.json').smtpUser,
    "pass": process.env.smtp_pass || require('config.json').smtpPass
  }
}

module.exports = sendEmail;

async function sendEmail({ to, subject, templateName, data, from = emailFrom }) {

  readHTMLFile(`${__dirname}/email_templates/${templateName}.html`, function(err, templateHtml) {
    
    const transporter = nodemailer.createTransport(smtpOptions);
    const template = handlebars.compile(templateHtml);
    const html = template(data);

    transporter.sendMail({ from, to, subject, html }, function (error, response) {
      if (error) {
        console.log(error);
      }
    });
  });
}
