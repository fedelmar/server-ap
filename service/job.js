const schedule = require('node-schedule')
const { enviarReportes } = require('./correo/enviarReportes')

let tarea

const job = async () => {
  const regla = new schedule.RecurrenceRule()
  regla.month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  regla.hour = 14
  regla.minute = 00
  regla.second = 0

  regla.date = 1
  regla.dayOfWeek = [new schedule.Range(1, 5)] // Lunes a Viernes

  const fechaActual = new Date()
  const diaActual = fechaActual.getDate()
  const diaSemanaActual = fechaActual.getDay()

  if (diaActual === 1 && (diaSemanaActual === 0 || diaSemanaActual === 6)) {
    // Si el primer día del mes es sábado (6) o domingo (0), se programa para el siguiente lunes (1).
    regla.date = 2
  }

  tarea = schedule.scheduleJob(regla, function () {
    console.log('Ejecutando tarea el primer día de cada mes a las 9:30 AM')
    enviarReportes()
  })
}
module.exports = { job }
