const StockInsumo = require("../../models/StockInsumos");
const Insumos = require("../../models/Insumos");
const InsumosFaltantes = require("../../models/InsumosFaltantes");

const obtenerStockInsumos = async () => {
  try {
    const insumos = await StockInsumo.find({}).sort({ $natural: -1 });
    return insumos;
  } catch (error) {
    console.log(error);
  }
};

const obtenerInsumosFaltantes = async () => {
  try {
    const insumos = await StockInsumo.aggregate([
      {
        $group: {
          _id: "$insumo",
          count: { $sum: "$cantidad" },
        },
      },
      {
        $sort: { categoria: -1 }
      }
    ]);

    const insumosIDsFaltante = insumos.filter((insumo) => insumo.count < 1000);

    const insumosDatosFaltante = await Promise.all(insumosIDsFaltante.map(async (insumo) => {
      const i = await Insumos.findOne({
        _id: insumo._id,
      });
      return {
        insumo: i.nombre,
        categoria: i.categoria,
        cantidad: insumo.count,
      };
    }))

    const insumosDatosFaltanteFiltrado = insumosDatosFaltante
      .filter((insumo) => insumo.categoria !== 'Quimico' && insumo.categoria !== 'Placas');

    return insumosDatosFaltanteFiltrado;

  } catch (error) {
    console.log(error);
  }
};

const obtenerInsumosFaltantesModelo = async () => {
  try {
    const faltantes = await InsumosFaltantes.find({});
    return faltantes;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  obtenerStockInsumos,
  obtenerInsumosFaltantes,
  obtenerInsumosFaltantesModelo
};
