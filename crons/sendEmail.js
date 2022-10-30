const nodemailer = require('nodemailer')

const sendEmail = (insumosFaltantes, subject) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'martin.mdp92@gmail.com',
      pass: process.env.EMAIL_KEY
    }
  })

  const mailContent = () => {
    const thead = `
      <thead>
        <tr>
          <th>Insumo</th>
          <th>Categoria</th>
          <th>Cantidad</th>
        </tr>
      </thead>`

    let insumos = ''
    insumosFaltantes.forEach((insumo) => {
      insumos += `
        <tr>
          <td> ${insumo.insumo} </td>
          <td> ${insumo.categoria} </td>
          <td> ${insumo.cantidad} </td>
        </tr>`
    })

    const tbody = `
      <tbody>   
      ${insumos}
      </tbody>`

    return `
      <html>
        <h3 align="start">Insumos con Faltante</h3>
        <table cellspacing="0" cellpadding="0" width="640" border="1">
          ${thead}
          ${tbody}
        </table>
      </html>`
  }

  const mailOptions = {
    from: 'martin.mdp92@gmail.com',
    to: ['fsuarez91@gmail.com'],
    subject: subject,
    html: mailContent()
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Se envio el email: ' + subject)
      console.log('Email sent: ' + info.response)
    }
  })
}

module.exports = { sendEmail }
