const { gql } = require('apollo-server');

const typeDefs = gql`

    type Usuario {
        id: ID
        nombre: String
        apellido: String
        email: String
        creado: String
    }

    type Query {
        obtenerProducto: String
    }
    type Mutation {
        nuevoUsuario: String
    }
`;

module.exports = typeDefs;
