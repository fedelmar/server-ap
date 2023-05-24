const schedule = require('node-schedule')
const { enviarReportes } = require('./correo/enviarReportes')

let tarea

const job = async () => {
  const regla = new schedule.RecurrenceRule()
  // regla.month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  // regla.dayOfWeek = [0, 1, 2, 3, 4, 5, 6]
  // regla.hour = 22
  // regla.minute = 45
  regla.second = 0

  tarea = schedule.scheduleJob(regla, function () {
    console.log('Ejecutando tarea el primer día de cada mes a las 9:30 AM')
    enviarReportes()
  })
}
module.exports = { job }
