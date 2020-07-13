const Usuario = require('../models/Usuarios');
const bcryptjs = require('bcryptjs');

const resolvers = {

    Query: {
        obtenerProducto: () => Algo,
    },
    Mutation: {
        nuevoUsuario: async (_, { input }) =>{

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
        }
    }

}

module.exports = resolvers;
