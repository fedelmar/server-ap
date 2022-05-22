const Usuario = require('../../models/Usuarios');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const crearToken = (usuario, secreta, expiresIn) => {
  const { id, email, nombre, apellido, rol } = usuario;
  return jwt.sign( {id, email, nombre, apellido, rol }, secreta)
};

const crear = async (_, { input }) => {

  const { email, password } = input;

  //Verificar si ya existe el usuario
  const existeUsuario = await Usuario.findOne({email});
  if (existeUsuario) {
      throw new Error('El usuario ya esta registrado');
  }

  //Codificar password
  const salt = await bcryptjs.genSalt(10);
  input.password = await bcryptjs.hash(password, salt);

  //Guardar en la base de datos
  try {
      const usuario = new Usuario(input);
      usuario.save();
      return usuario;
  } catch (error) {
      console.log(error);
  }
};

const modificarPassword = async (_, {id, input}) => {
  const {password, newPassword } = input;

  const usuario = await Usuario.findById(id);

  //Comprobar validez de password
  const passwordCorrecto = await bcryptjs.compare( password, usuario.password );
  if (!passwordCorrecto) {
      throw new Error('Contraseña incorrecta');
  }

  //Codificar nuevo password
  const salt = await bcryptjs.genSalt(10);
  nuevoPassword = await bcryptjs.hash(newPassword, salt);

  const resultado = await Usuario.findByIdAndUpdate({_id: id}, {password: nuevoPassword}, {new: true});

  if (resultado) {
      return 'Contraseña actualizada con exito.'
  } else {
      return 'Hubo un error al actualizar la contraseña.'
  }

};

const autenticar = async (_, {input}) => {

  const { password, nombre } = input;
  const existeUsuario = await Usuario.findOne({nombre});    

  //Verificar si ya existe el usuario
  if (!existeUsuario) {
      throw new Error('Usuario incorrecto');
  }            
  //Comprobar validez de password
  const passwordCorrecto = await bcryptjs.compare( password, existeUsuario.password );
  if (!passwordCorrecto) {
      throw new Error('Contraseña incorrecta');
  }

  //Generar Token
  return {
      token: crearToken(existeUsuario, process.env.SECRETA, '24h' ),
  }
};

const actualizar = async (_, {id, input}) => {
  const { password, nombre, apellido, email } = input;
  let usuario = await Usuario.findById(id);

  //Comprobar validez de password
  const passwordCorrecto = await bcryptjs.compare( password, usuario.password );
  if (!passwordCorrecto) {
      throw new Error('Contraseña incorrecta');
  }

  // Actualizar Usuario
  const usuarioActualizado = await Usuario.findOneAndUpdate(
      {_id: usuario.id}, 
      {nombre: nombre, apellido: apellido, email: email}, 
      {new: true}
  )

  return usuarioActualizado;
};

module.exports = {
  crear,
  autenticar,
  actualizar,
  modificarPassword,
}