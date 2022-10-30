const { CronJob } = require("cron");
const { obtenerInsumosFaltantes } = require("../db/queries/insumos");
const {
  nuevoInsumoFaltante,
  actualizarInsumoFaltante,
} = require("../db/mutations/insumosFaltantes");
const { obtenerInsumosFaltantesModelo } = require("../db/queries/insumos");
const { sendEmail } = require("./sendEmail.js");

//                    ┌────────────── second (optional)
//                    │ ┌──────────── minute
//                    │ │ ┌────────── hour
//                    │ │ │ ┌──────── day of month
//                    │ │ │ │ ┌────── month
//                    │ │ │ │ │ ┌──── day of week
//                    │ │ │ │ │ │
//                    │ │ │ │ │ │
//                    * * * * * *
const FREQUENCY = "*/10 * * * * *";

const outOfStockEmail = async () => {
  console.log('Entra en el cron')
  const insumosFaltantes = await obtenerInsumosFaltantes();
  const insumosFaltantesString = JSON.stringify(insumosFaltantes);
  const insumosFaltantesGuardados = await obtenerInsumosFaltantesModelo();
  
  if (insumosFaltantesGuardados.length !== 0) {
    console.log("ingresa en el if, ya hay insumos guardados")
    const { id, faltantes } = insumosFaltantesGuardados[0];
    if (insumosFaltantesString !== faltantes) {
      console.log('Manda el mail, insumos son diferentes')
      sendEmail(insumosFaltantes, "Hay insumos en faltante.");
      actualizarInsumoFaltante(id, insumosFaltantesString);
    }
  } else {
    console.log("ingresa en en else, no hay insumos guardados")
    nuevoInsumoFaltante(insumosFaltantesString);
    sendEmail(insumosFaltantes, "Hay nuevos insumos en faltante.");
  }
};

const Job = (funct) => {
  const job = new CronJob(
    FREQUENCY,
    funct,
    null,
    true,
    "America/Argentina/Buenos_Aires",
    false,
    true
  );
  job.start();
};

exports.cron = () => {
  Job(outOfStockEmail);
};
