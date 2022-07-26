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

    const insumosFiltrados = insumos.filter((insumo) => insumo.count < 1000);

    const insumosConFaltante = await insumosFiltrados.map(async (insumo) => {
      const i = await Insumos.findOne({
        _id: insumo._id,
      });
      return {
        insumo: i.nombre,
        categoria: i.categoria,
        cantidad: insumo.count,
      };
    });

    return insumosConFaltante;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  obtenerStockInsumos,
  obtenerInsumosFaltantes,
};
