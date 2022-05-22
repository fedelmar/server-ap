const Ingresos = require("../../models/Ingresos");
const { getRegs, getSingleReg, getRegsByDate } = require('../queries/common');


module.exports = {
  obtenerRegistroIngreso: async (_, { id }) => getSingleReg(id, Ingresos),
  obtenerRegistrosIngresos: async (_, { page }) => getRegs(page, Ingresos),
  getRegsByDateIngreso: async (_, { input }) => getRegsByDate(Ingresos, input)
};
