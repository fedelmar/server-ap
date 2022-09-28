const StockInsumo = require("../../models/StockInsumos");
const Insumos = require("../../models/Insumos");

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
      .filter((insumo) => insumo.categoria !== 'Quimico' && insumo.categoria !== 'Placas')
      .sort((a, b) => {
        let insumoA = a.insumo;
        let insumoB = b.insumo;
        if (insumoA < insumoB) {
          return -1;
        }
        if (insumoA > insumoB) {
          return 1;
        }
        return 0;
      });

    return insumosDatosFaltanteFiltrado;

  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  obtenerStockInsumos,
  obtenerInsumosFaltantes,
};
