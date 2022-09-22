const { CronJob } = require('cron');
const { obtenerInsumosFaltantes } = require('../db/queries/insumos');


//                    ┌────────────── second (optional)
//                    │ ┌──────────── minute
//                    │ │ ┌────────── hour
//                    │ │ │ ┌──────── day of month
//                    │ │ │ │ ┌────── month
//                    │ │ │ │ │ ┌──── day of week
//                    │ │ │ │ │ │
//                    │ │ │ │ │ │
//                    * * * * * *
const FREQUENCY = '*/60 * * * * *';


const outOfStockEmail = async () => {
  const insumosFaltantes = await obtenerInsumosFaltantes();
  //const result = await Promise.all(insumosFaltantes);
  console.log('Insumos Faltantes:', insumosFaltantes);
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