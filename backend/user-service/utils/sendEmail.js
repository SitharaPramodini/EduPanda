const nodemailer = require("nodemailer");

const sendEmail = async (subject, message, send_to, sent_from, reply_to, callback) => {
  // Create Email Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Option for sending email
  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message,
  };

  // send email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
      callback(false); // Pass false to the callback if there's an error
    } else {
      console.log(info);
      console.log("sent");
      callback(true); // Pass true to the callback if the email is sent successfully
    }
  });
};

module.exports = sendEmail;
