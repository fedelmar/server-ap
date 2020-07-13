const { addErrorLoggingToSchema } = require("apollo-server");

const resolvers = {

    Query: {
        obtenerProducto: () => Algo,
    }
}

module.exports = resolvers;
