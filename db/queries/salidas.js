const Salidas = require("../../models/Salidas");
const { getRegs, getSingleReg } = require('../queries/common');

const obtenerRegistrosSalidas = async (_, { page }) => {
  return getRegs(page, Salidas);
};

const obtenerRegistroSalida = async (_, { id }) => {
  return getSingleReg(id, Salidas);
};

const obtenerLotesPorSalida = async (_, { id }) => {
  let lote = await Salida.findById(id);
  let stockProductos = await StockProducto.find({});
  let productos = await Producto.find({});

  const { lotes } = lote;

  let lotesSalidas = [];
  
  lotes.forEach(function(index){
      let loteSalida = stockProductos.find(i => i.id == index.lote)
      let nombreProducto = productos.find(i => i.id == loteSalida.producto).nombre
      lotesSalidas.push({
          lote: loteSalida.lote,
          producto: nombreProducto,
          cantidad: index.cantidad
      })
  })
  
  return lotesSalidas;
};


module.exports = {
  obtenerRegistrosSalidas,
  obtenerRegistroSalida,
  obtenerLotesPorSalida
}
