const { addErrorLoggingToSchema } = require("apollo-server");

const resolvers = {

    Query: {
        obtenerProducto: () => Algo,
    },
    Mutation: {
        nuevoUsuario: () => "Creando usuario"
    }

}

module.exports = resolvers;
