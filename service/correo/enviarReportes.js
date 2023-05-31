const {
  getRegsByDatePE,
  getRegsByDateGE
} = require('../../db/queries/esponjas')
const { getRegsByDateCPG, getRegsByDatePG } = require('../../db/queries/gel')
const { getRegsByDateIngreso } = require('../../db/queries/ingresos')
const {
  getRegsByDatePP,
  getRegsByDateGP,
  getRegsByDateSP
} = require('../../db/queries/placas')
const { getRegsByDateSalidas } = require('../../db/queries/salidas')
const { crearPDF } = require('./crearPDF')
const { enviarCorreo } = require('./enviarCorreo')
const moment = require('moment')

const enviarReportes = async () => {
  let start = moment().startOf('month').format()
  let end = moment().add(1, 'months').startOf('month').format()
  let attachments = []
  let inputDate = { input: { start, end } }

  const salidas = await getRegsByDateSalidas(undefined, inputDate)
  attachments.push(crearPDF(salidas, 'SALIDAS'))

  const ingreso = await getRegsByDateIngreso(undefined, inputDate)
  attachments.push(crearPDF(ingreso, 'INGRESOS'))

  const preparacionGel = await getRegsByDatePG(undefined, inputDate)
  attachments.push(crearPDF(preparacionGel, 'PREPARACION_GEL'))

  const produccionGel = await getRegsByDateCPG(undefined, inputDate)
  attachments.push(crearPDF(produccionGel, 'PRODUCCION_GEL'))

  const guardaoPlacas = await getRegsByDateGP(undefined, inputDate)
  attachments.push(crearPDF(guardaoPlacas, 'GUARDADO_PLACAS'))

  const selladoPlacas = await getRegsByDateSP(undefined, inputDate)
  attachments.push(crearPDF(selladoPlacas, 'SELLADO_PLACAS'))

  const produccionPlacas = await getRegsByDatePP(undefined, inputDate)
  attachments.push(crearPDF(produccionPlacas, 'PRODUCCION_PLACAS'))

  const guardadoEsponjas = await getRegsByDateGE(undefined, inputDate)
  attachments.push(crearPDF(guardadoEsponjas, 'GUARDADO_ESPONJAS'))

  const ProduccionEsponjas = await getRegsByDatePE(undefined, inputDate)
  attachments.push(crearPDF(ProduccionEsponjas, 'PRODUCCION_ESPONJAS'))
  console.log(attachments)
  await enviarCorreo(attachments)
}
module.exports = { enviarReportes }
