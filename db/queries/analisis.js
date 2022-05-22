const moment = require('moment');
const Producto = require('../../models/Productos');
const { seleccionarModelo } = require('./utils');

const calcularIndice = async (registros) => {
  let sumaIndices = 0;
  let i = 0;
  registros.forEach(registro => {
    const { modificado, creado, cantProducida, guardado, sellado } = registro;

    let cantidad;
    if (cantProducida) {
      cantidad = cantProducida;
    } else if (guardado) {
      cantidad = guardado;
    } else if (sellado) {
      cantidad = sellado;
    } else {
      cantidad = 0;
    }

    const a = moment(modificado);
    const b = moment(creado);
    const diff = a.diff(b, 'minutes');
    console.log(diff);
    const indice = diff !== 0 || diff <= 60 ? cantidad / diff : 0;
    if (indice <= 5) {
      sumaIndices += indice; 
      i += 1;
    }
  });
  return sumaIndices / i;
};

const indiceDeProduccion = async (_, { tiempo, modelo }) => {
  const { Modelo, categoria } = seleccionarModelo(modelo);
  const listaProductos = await Producto.find(
    { 
      categoria,
    },
    { "nombre": 1, "_id": 0, }
  );
  const listaIndices = await listaProductos.map(async function(producto) {
    const registros = await Modelo.find(
      { 
        'creado':  {
          $gt: tiempo ? tiempo.desde : 0,
          $lt: tiempo ? tiempo.hasta : Date.now(),
        },
        "producto": producto.nombre 
      },
      {
        "cantProducida": 1,
        "guardado": 1,
        "sellado": 1,
        "creado": 1,
        "modificado": 1,
        "_id": 0,
      }
    );

    const indice = await calcularIndice(registros);
    if (indice && indice !== 0) {
      return { producto: producto.nombre, indice };
    } else {
      return  { producto: producto.nombre, indice: 0 };
    }
  });

  return listaIndices;
};

const indicePorProducto = async (_, { tiempo, producto, modelo }) => {
  const { Modelo } = seleccionarModelo(modelo);
  const registros = await Modelo.find(
    { 
      'creado':  {
        $gt: tiempo ? tiempo.desde : 0,
        $lt: tiempo ? tiempo.hasta : Date.now(),
      },
      'producto': producto,
    },
    {
      "cantProducida": 1,
      "creado": 1,
      "modificado": 1,
      "_id": 0,
    }
  )

  let indicesTotal = calcularIndice(registro);

  return indicesTotal / registros.length;
};

module.exports = {
  indicePorProducto,
  indiceDeProduccion,
};
