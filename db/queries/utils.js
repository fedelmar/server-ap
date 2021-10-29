const CPE = require('../../models/CPE');
const CGE = require('../../models/CGE');
const CPP = require('../../models/CPP');
const CGP = require('../../models/CGP');
const CSP = require('../../models/CSP');
const CPG = require('../../models/CPG');

const seleccionarModelo = (modelo) => {
  switch (modelo) {
    case 'CPE':
      return { Modelo: CPE, categoria: 'Esponjas' };
    case 'CGE':
      return { Modelo: CGE, categoria: 'Esponjas' };
    case 'CPP':
      return { Modelo: CPP, categoria: 'Placas' };
    case 'CGP':
      return { Modelo: CGP, categoria: 'Placas' };
    case 'CSP':
      return { Modelo: CSP, categoria: 'Placas' };
    case 'CPG':
      return { Modelo: CPG, categoria: 'Geles' };
    default:
      break;
  };
};

module.exports = {
  seleccionarModelo,
};
