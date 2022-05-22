const CPG = require('../../models/CPG');
const PG = require('../../models/PG');

const { PAGE_SIZE } = require('../../constants');
const { getRegs, getSingleReg, getOpenRegs, getRegsByDate } = require('../queries/common');


const obtenerRegistrosPG = async (_, { page }) => {
  page = page || 1;
  const skip = (page - 1) * PAGE_SIZE;
  return PG.find({})
          .sort({ $natural: -1 })
          .skip(skip)
          .limit(PAGE_SIZE);
};

const getRegsByDatePG = async (_, { input }) => {
  const { start, end } = input;
  const reg = await PG.find({
    creado: {
      $gte: start,
      $lt: end,
    }
  })
  .sort({ $natural: -1 });
  return reg;
};

module.exports = {
  // PREPARADO
  obtenerRegistrosPG,
  getRegsByDatePG,
  obtenerRegistroPG: async (_, { id }) => getSingleReg(id, PG),
  obtenerRegistrosAbiertosPG: async (_, {}) => getOpenRegs(PG),
  // PRODUCCION
  obtenerRegistroCPG: async (_, { id }) => getSingleReg(id, CPG),
  obtenerRegistrosCPG: async (_, { page }) => getRegs(page, CPG),
  obtenerRegistrosAbiertosCPG: async (_, {}) => getOpenRegs(CPG),
  getRegsByDateCPG: async (_, { input }) => getRegsByDate(CPG, input),
}
