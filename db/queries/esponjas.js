const CPE = require('../../models/CPE');
const { PAGE_SIZE } = require('../../constants');

const obtenerRegistrosPE = async (_, { page }) => {
  page = page || 1;
  const skip = (page - 1) * PAGE_SIZE;
  return CPE.find({ estado: false })
          .sort({ $natural: -1 })
          .skip(skip)
          .limit(PAGE_SIZE);
};

const obtenerRegistrosAbiertosPE = async (_, {}) => {
  return CPE.find({ estado: true })
          .sort({ $natural: -1 });
};

module.exports = {
  obtenerRegistrosPE,
  obtenerRegistrosAbiertosPE,
};