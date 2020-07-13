const { addErrorLoggingToSchema } = require("apollo-server");

const resolvers = {

    Query: {
        obtenerProducto: () => Algo,
    },
    Mutation: {
        nuevoUsuario: (_, { input }) =>{
            console.log(input);
            return "Creando... "
        }
    }

}

module.exports = resolvers;
