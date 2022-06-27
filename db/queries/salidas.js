const Salidas = require("../../models/Salidas");
const { getRegs, getSingleReg } = require("../queries/common");

const obtenerLotesPorSalida = async (_, { id }) => {
  let lote = await Salidas.findById(id);
  let stockProductos = await StockProducto.find({});
  let productos = await Producto.find({});

  const { lotes } = lote;

  let lotesSalidas = [];

  lotes.forEach(function (index) {
    let loteSalida = stockProductos.find((i) => i.id == index.lote);
    let nombreProducto = productos.find(
      (i) => i.id == loteSalida.producto
    ).nombre;
    lotesSalidas.push({
      lote: loteSalida.lote,
      producto: nombreProducto,
      cantidad: index.cantidad,
    });
  });

  return lotesSalidas;
};

const getRegsByDateSalidas = async (_, { input }) => {
  const { end, start } = input;
  const reg = await Salidas.find({
    fecha: {
      $gte: start,
      $lt: end,
    },
  }).sort({ $natural: -1 });
  return reg;
};

module.exports = {
  obtenerRegistrosSalidas: async (_, { page }) => getRegs(page, Salidas),
  obtenerRegistroSalida: async (_, { id }) => getSingleReg(id, Salidas),
  obtenerLotesPorSalida,
  getRegsByDateSalidas,
};
