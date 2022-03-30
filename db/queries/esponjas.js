const CPE = require('../../models/CPE');
const CGE = require('../../models/CGE');
const { getRegs, getSingleReg, getOpenRegs } = require('../queries/common');

const obtenerRegistrosPE = async (_, { page }) => {
  return getRegs(page, CPE);
};

const obtenerRegistrosAbiertosPE = async (_, {}) => {
  return getOpenRegs(CPE);
};

const obtenerRegistrosGE = async (_, { page }) => {
  const regs = getRegs(page, CGE);
  return regs;
};

const obtenerRegistrosAbiertosGE = async (_, {}) => {
  return getOpenRegs(CGE);
};

const obtenerRegistroGE = async (_, { id }) => {
  return getSingleReg(id, CGE);
};

module.exports = {
  obtenerRegistrosPE,
  obtenerRegistrosAbiertosPE,
  obtenerRegistroGE,
  obtenerRegistrosGE,
  obtenerRegistrosAbiertosGE,
};