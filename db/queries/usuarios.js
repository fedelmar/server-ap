const Usuario = require('../../models/Usuarios');

const obtener = async (_, { }, ctx) => {
  return ctx.usuario;
};

const obtenerTodos = async () => {
  try {
      const usuarios = await Usuario.find({});
      return usuarios
  } catch (error) {
      console.log(error);
  }
};

module.exports = {
  obtener,
  obtenerTodos,
};