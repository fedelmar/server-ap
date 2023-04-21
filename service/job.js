const { getRegsByDatePE, getRegsByDateGE } = require("../db/queries/esponjas");
const { getRegsByDateCPG, getRegsByDatePG } = require("../db/queries/gel");
const { getRegsByDateIngreso } = require("../db/queries/ingresos");
const { getRegsByDatePP, getRegsByDateGP, getRegsByDateSP } = require("../db/queries/placas");
const { getRegsByDateSalidas } = require("../db/queries/salidas");
const { crearPDF } = require("./crearPDF");
const { enviarCorreo } = require("./enviarCorreo");

const attachments = []

const job = async () => {
    //salidas
    const result1 = await getRegsByDateSalidas(undefined,
        {
            input: {
                start: "Tue Feb 01 2022 00:00:00 GMT-0300 (hora estándar de Argentina)",
                end: "Thu Sep 01 2022 23:59:00 GMT-0300 (hora estándar de Argentina)"
            }
        });
    attachments.push(crearPDF(result1, "SALIDAS"));


    //ingresos
    const result2 = await getRegsByDateIngreso(undefined, {
        input: {
            start: "Tue Feb 01 2021 00:00:00 GMT-0300 (hora estándar de Argentina)",
            end: "Thu Sep 01 2021 23:59:00 GMT-0300 (hora estándar de Argentina)"
        }
    });
    attachments.push(crearPDF(result2, "INGRESOS"));

    //Preparacion de Gel Regrigerante
    const result3 = await getRegsByDatePG(undefined, {
        input: {
            start: "Tue JAN 01 2021 00:00:00 GMT-0300 (hora estándar de Argentina)",
            end: "Thu Sep 01 2023 23:59:00 GMT-0300 (hora estándar de Argentina)"
        }
    })
    attachments.push(crearPDF(result3, "PREPARACION_GEL"));

    //Produccion de Gel
    const result4 = await getRegsByDateCPG(undefined, {
        input: {
            start: "Tue JAN 01 2021 00:00:00 GMT-0300 (hora estándar de Argentina)",
            end: "Thu Sep 01 2021 23:59:00 GMT-0300 (hora estándar de Argentina)"
        }
    })
    attachments.push(crearPDF(result4, "PRODUCCION_GEL"));

    //Guardado de Placas
    const result5 = await getRegsByDateGP(undefined, {
        input: {
            start: "Tue JAN 01 2021 00:00:00 GMT-0300 (hora estándar de Argentina)",
            end: "Thu Sep 01 2021 23:59:00 GMT-0300 (hora estándar de Argentina)"
        }
    })
    attachments.push(crearPDF(result5, "GUARDADO_PLACAS"));

    //Sellado de Placas
    const result6 = await getRegsByDateSP(undefined, {
        input: {
            start: "Tue JAN 01 2021 00:00:00 GMT-0300 (hora estándar de Argentina)",
            end: "Thu Sep 01 2021 23:59:00 GMT-0300 (hora estándar de Argentina)"
        }
    })
    attachments.push(crearPDF(result6, "SELLADO_PLACAS"));

    //Registros de produccion de Placas
    const result7 = await getRegsByDatePP(undefined, {
        input: {
            start: "Tue JAN 01 2021 00:00:00 GMT-0300 (hora estándar de Argentina)",
            end: "Thu Sep 01 2021 23:59:00 GMT-0300 (hora estándar de Argentina)"
        }
    })
    attachments.push(crearPDF(result7, "PRODUCCION_PLACAS"));

    //Guardado de Esponjas
    const result8 = await getRegsByDateGE(undefined, {
        input: {
            start: "Tue JAN 01 2021 00:00:00 GMT-0300 (hora estándar de Argentina)",
            end: "Thu Sep 01 2021 23:59:00 GMT-0300 (hora estándar de Argentina)"
        }
    })
    attachments.push(crearPDF(result2, "GUARDADO_ESPONJAS"));

    //Registros de produccion de Esponjas
    const result9 = await getRegsByDatePE(undefined, {
        input: {
            start: "Tue JAN 01 2021 00:00:00 GMT-0300 (hora estándar de Argentina)",
            end: "Thu Sep 01 2021 23:59:00 GMT-0300 (hora estándar de Argentina)"
        }
    })
    attachments.push(crearPDF(result9, "PRODUCCION_ESPONJAS"));
    await enviarCorreo(attachments);
}
module.exports = { job }