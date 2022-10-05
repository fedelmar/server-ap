const nodemailer = require("nodemailer");

const sendEmail = (mailContent, subject) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "martin.mdp92@gmail.com",
      pass: "PASS_LLAVE",
    },
  });

  const mailOptions = {
    from: "martin.mdp92@gmail.com",
    to: ["martinrdilorenzo@gmail.com"],
    subject: subject,
    text: mailContent,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendEmail };