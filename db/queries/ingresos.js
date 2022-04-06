const Ingresos = require("../../models/Ingresos");
const { getRegs, getSingleReg } = require('../queries/common');


const obtenerRegistrosIngresos = async (_, { page }) => {
  const reg = getRegs(page, Ingresos);
  return reg;

};

const obtenerRegistroIngreso = async (_, { id }) => {
  return getSingleReg(id, Ingresos);
};

module.exports = {
  obtenerRegistroIngreso,
  obtenerRegistrosIngresos,
};
