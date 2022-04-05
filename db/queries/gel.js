const CPG = require('../../models/CPG');
const PG = require('../../models/PG');

const { PAGE_SIZE } = require('../../constants');
const { getRegs, getSingleReg, getOpenRegs } = require('../queries/common');


/**
 * Preparacion de gel
 */
const obtenerRegistrosPG = async (_, { page }) => {
  page = page || 1;
  const skip = (page - 1) * PAGE_SIZE;
  return PG.find({})
          .sort({ $natural: -1 })
          .skip(skip)
          .limit(PAGE_SIZE);
};

const obtenerRegistrosAbiertosPG = async (_, {}) => {
  return getOpenRegs(PG);
};

const obtenerRegistroPG = async (_, {id}) => {
  return getSingleReg(id, PG)
};

/**
 * Produccion de gel
 */
const obtenerRegistrosCPG = async (_, { page }) => {
  return getRegs(page, CPG);
};

const obtenerRegistrosAbiertosCPG = async () => {
  return getOpenRegs(CPG);
};

const obtenerRegistroCPG = async (_, {id}) => {
  return getSingleReg(id, CPG)
};

module.exports = {
  obtenerRegistrosPG,
  obtenerRegistrosAbiertosPG,
  obtenerRegistroPG,
  obtenerRegistrosCPG,
  obtenerRegistrosAbiertosCPG,
  obtenerRegistroCPG,
}