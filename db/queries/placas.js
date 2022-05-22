const CPP = require('../../models/CPP');
const CSP = require('../../models/CSP');
const CGP = require('../../models/CGP');

const { getRegs, getSingleReg, getOpenRegs, getRegsByDate } = require('../queries/common');

module.exports = {
  // PRODUCCION
  obtenerRegistroPP: async (_, { id }) => getSingleReg(id, CPP),
  obtenerRegistrosPP: async (_, { page }) => getRegs(page, CPP),
  obtenerRegistrosAbiertosPP: async (_, {}) => getOpenRegs(CPP),
  getRegsByDatePP: async (_, { input }) => getRegsByDate(CPP, input),
  // SELLADO
  obtenerRegistroSP: async (_, { id }) => getSingleReg(id, CSP),
  obtenerRegistrosSP: async (_, { page }) => getRegs(page, CSP),
  obtenerRegistrosAbiertosSP: async (_, {}) => getOpenRegs(CSP),
  getRegsByDateSP: async (_, { input }) => getRegsByDate(CSP, input),
  // GUARDADO
  obtenerRegistroGP: async (_, { id }) => getSingleReg(id, CGP),
  obtenerRegistrosGP: async (_, { page }) => getRegs(page, CGP),
  obtenerRegistrosAbiertosGP: async (_, {}) => getOpenRegs(CGP),
  getRegsByDateGP: async (_, { input }) => getRegsByDate(CGP, input),
};
