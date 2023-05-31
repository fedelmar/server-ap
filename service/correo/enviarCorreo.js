const nodemailer = require('nodemailer')
const moment = require('moment')
const { eliminarPDF } = require('./eliminarPDF')

// Función que envía el PDF por correo electrónico
const enviarCorreo = (attachments) => {
  const ENV = process.env
  let reportDate = moment().format('DD-MM-YYYY')
  // Configuramos el transporter de nodemailer
  let transporter = nodemailer.createTransport({
    host: ENV.MAIL_HOST,
    port: ENV.MAIL_PORT,
    auth: {
      user: ENV.MAIL_USER,
      pass: ENV.MAIL_PASS
    }
  })

  let mailOptions = {
    from: ENV.EMAIL_FROM,
    to: ENV.EMAIL_TO,
    html: `<div>
                    <h4> Generación del reporte con fecha ${reportDate} realizada correctamente </h4>
                    <h4> los reportes estan adjuntado al mensaje</h4>
                </div>`,
    subject: `Reporte mensual del ${reportDate}`,
    attachments
  }

  // Enviamos el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Correo electrónico enviado: ' + info.response)
      eliminarPDF();
    }
  });

}

module.exports = {
  enviarCorreo
}
