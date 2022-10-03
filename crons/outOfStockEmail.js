const { CronJob } = require('cron');
const { obtenerInsumosFaltantes } = require('../db/queries/insumos');
const { nuevoInsumoFaltante } = require("../db/mutations/insumosFaltantes");


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

let insumosFaltantesAnt = null;


const outOfStockEmail = async () => {
  const insumosFaltantes = await obtenerInsumosFaltantes();
  const stringFaltantes = JSON.stringify(insumosFaltantes);
  nuevoInsumoFaltante(stringFaltantes);
  // let compararInsumos = JSON.stringify(insumosFaltantes) !== JSON.stringify(insumosFaltantesAnt);
  // if (insumosFaltantes && compararInsumos) {
  //   console.log("ENVIAR EMAIL");
  // }

  // console.log("INSUMOS ANTERIOR: ", JSON.stringify(insumosFaltantesAnt));
  // console.log("INSUMOS FALTANTES: ", JSON.stringify(insumosFaltantes));
  // console.log("Comparar Insumos: ", compararInsumos);
  insumosFaltantesAnt = insumosFaltantes;

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