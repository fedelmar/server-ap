const schedule = require('node-schedule')
const { enviarReportes } = require('./correo/enviarReportes')

let tarea

const job = async () => {
  const regla = new schedule.RecurrenceRule()
  // regla.month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  // regla.dayOfWeek = 1
  // regla.hour = 9
  regla.second = 1

  tarea = schedule.scheduleJob(regla, function () {
    console.log('Ejecutando tarea el primer día de cada mes a las 9:30 AM')
    enviarReportes()
  })
}
module.exports = { job }
