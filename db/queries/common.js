const { PAGE_SIZE } = require('../../constants');

const getRegs = (page, model) => {
  page = page || 1;
  const skip = (page - 1) * PAGE_SIZE;
  return model.find({ estado: false })
          .sort({ $natural: -1 })
          .skip(skip)
          .limit(PAGE_SIZE);
};

const getOpenRegs = (model) => {  
  return model.find({ estado: true })
              .sort({ $natural: -1 });
}

const getSingleReg = async (id, model) => {
  const reg = await model.findById(id);
  if (!reg) {
    throw new Error('Registro no encontrado');
  }

  return reg;
}

module.exports = {
  getRegs,
  getOpenRegs,
  getSingleReg,
};