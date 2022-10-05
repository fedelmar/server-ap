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
  const insumosFaltantes = await obtenerInsumosFaltantes();
  const insumosFaltantesString = JSON.stringify(insumosFaltantes);
  const insumosFaltantesGuardados = await obtenerInsumosFaltantesModelo();
  if (insumosFaltantesGuardados.length !== 0) {
    const { id, faltantes } = insumosFaltantesGuardados[0];
    if (insumosFaltantesString !== faltantes) {
      const subject = "Hay insumos en faltante.";
      const mailContent = insumosFaltantesString;
      sendEmail(mailContent, subject);
      actualizarInsumoFaltante(id, insumosFaltantesString);
    }
  } else {
    nuevoInsumoFaltante(insumosFaltantesString);
    const mailContent = insumosFaltantesString;
    sendEmail(mailContent, "Hay nuevos insumos en faltante.");
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
