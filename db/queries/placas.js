const CPP = require('../../models/CPP');
const CSP = require('../../models/CSP');
const CGP = require('../../models/CGP');

const { getRegs, getSingleReg, getOpenRegs } = require('../queries/common');

/**
 * Producción de placas 
 */
const obtenerRegistrosPP = async (_, { page }) => {
  return getRegs(page, CPP);
};

const obtenerRegistrosAbiertosPP = async (_, {}) => {
  return getOpenRegs(CPP);
};

const obtenerRegistroPP = async (_, { id }) => {
  return getSingleReg(id, CPP);
};

/**
 * Sellado de placas
 */
const obtenerRegistrosSP = async (_, { page }) => {
  return getRegs(page, CSP);
};

const obtenerRegistrosAbiertosSP = async (_, {}) => {
  return getOpenRegs(CSP);
};

const obtenerRegistroSP = async (_, { id }) => {
  return getSingleReg(id, CSP);
};

/**
 * Guardado de placas
 */
const obtenerRegistrosGP = async (_, { page }) => {
  return getRegs(page, CGP);
};

const obtenerRegistrosAbiertosGP = async (_, {}) => {
  return getOpenRegs(CGP);
};

const obtenerRegistroGP = async (_, { id }) => {
  return getSingleReg(id, CGP);
};

module.exports = {
  obtenerRegistrosPP,
  obtenerRegistrosAbiertosPP,
  obtenerRegistroPP,
  obtenerRegistrosSP,
  obtenerRegistrosAbiertosSP,
  obtenerRegistroSP,
  obtenerRegistrosGP,
  obtenerRegistrosAbiertosGP,
  obtenerRegistroGP,
};