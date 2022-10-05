const nodemailer = require("nodemailer");

const sendEmail = (mailContent, subject) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "martin.mdp92@gmail.com",
      pass: process.env.EMAIL_KEY,
    },
  });

  const mailOptions = {
    from: "martin.mdp92@gmail.com",
    to: ["martinrdilorenzo@gmail.com", "fsuarez91@gmail.com"],
    subject: subject,
    text: mailContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Se envio el email: " + subject);
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendEmail };
