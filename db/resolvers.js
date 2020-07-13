const Usuario = require('../models/Usuarios');

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
