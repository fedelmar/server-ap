const { gql } = require('apollo-server');

const typeDefs = gql`

    type Usuario {
        id: ID
        nombre: String
        apellido: String
        email: String
        creado: String
    }

    input UsuarioInput {
        nombre: String!
        apellido: String!
        email: String!
        password: String!
    }

    type Query {
        obtenerProducto: String
    }
    type Mutation {
        nuevoUsuario(input: UsuarioInput): String
    }
`;

module.exports = typeDefs;
