const CPE = require('../../models/CPE');
const CGE = require('../../models/CGE');
const { getRegs, getSingleReg, getOpenRegs, getRegsByDate } = require('../queries/common');

module.exports = {
  // PRODUCCION
  obtenerRegistrosPE: async (_, { page }) => getRegs(page, CPE),
  obtenerRegistrosAbiertosPE: async (_, {}) => getOpenRegs(CPE),
  getRegsByDatePE: async (_, { input }) => getRegsByDate(CPE, input),
  // GUARDADOO
  obtenerRegistroGE: async (_, { id }) => getSingleReg(id, CGE),
  obtenerRegistrosGE: async (_, { page }) => getRegs(page, CGE),
  obtenerRegistrosAbiertosGE: async (_, {}) => getOpenRegs(CGE),
  getRegsByDateGE: async (_, { input }) => getRegsByDate(CGE, input),
};