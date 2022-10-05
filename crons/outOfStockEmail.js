const { CronJob } = require('cron');
const { obtenerInsumosFaltantes } = require('../db/queries/insumos');
const { nuevoInsumoFaltante, actualizarInsumoFaltante } = require("../db/mutations/insumosFaltantes");
const { obtenerInsumosFaltantesModelo } = require("../db/queries/insumos");
const { sendEmail } = require("./sendEmail.ts");


//                    ┌────────────── second (optional)
//                    │ ┌──────────── minute
//                    │ │ ┌────────── hour
//                    │ │ │ ┌──────── day of month
//                    │ │ │ │ ┌────── month
//                    │ │ │ │ │ ┌──── day of week
//                    │ │ │ │ │ │
//                    │ │ │ │ │ │
//                    * * * * * *
const FREQUENCY = '*/10 * * * * *';


const outOfStockEmail = async () => {
  const insumosFaltantes = JSON.stringify(await obtenerInsumosFaltantes());
  const insumosFaltantesGuardado = await obtenerInsumosFaltantesModelo();
  if (insumosFaltantesGuardado.length !== 0) {
    const { id, faltantes } = insumosFaltantesGuardado[0];
    if (insumosFaltantes !== faltantes) {
      sendEmail();
      console.log("Enviar Email\n");
      actualizarInsumoFaltante(id, insumosFaltantes);
    }
  } else {
    console.log("se guarda por primera vez\n");
    nuevoInsumoFaltante(insumosFaltantes);
  }
};


const Job = (funct) => {
  const job = new CronJob(
    FREQUENCY,
    funct,
    null,
    true,
    'America/Argentina/Buenos_Aires',
    false,
    true,
  );
  job.start();
};



exports.cron = () => {
  Job(outOfStockEmail);
}