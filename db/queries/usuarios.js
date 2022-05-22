const Usuario = require('../../models/Usuarios');

const obtenerUsuario = async (_, { }, ctx) => {
  return ctx.usuario;
};

const obtenerUsuarios = async () => {
  try {
      const usuarios = await Usuario.find({});
      return usuarios
  } catch (error) {
      console.log(error);
  }
};

module.exports = {
  obtenerUsuario,
  obtenerUsuarios,
};