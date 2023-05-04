const nodemailer = require('nodemailer');
const ejs = require('ejs');
require('dotenv').config()

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port:  process.env.SMTP_PORT,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL
  }
});

const sendEmail = (receiver, subject, content) => {
  ejs.renderFile(__dirname + '/template/welcome.ejs', { receiver, content }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var mailOptions = {
        from: process.env.USER_EMAIL,
        to: receiver,
        subject: subject,
        html: data
      };

      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log(info);
      });
    }
  });
};

module.exports = {
  sendEmail
};