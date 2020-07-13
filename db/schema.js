const { gql } = require('apollo-server');

const typeDefs = gql`

    type Producto {
        nombre: String
    }

    type Categoria {
        cat: String
    }

    input ProductoInput {
        cat: String
    }

    type Query {
        obtenerProductos(input: ProductoInput!): [Producto]
        obtenerCategoria: [Categoria]
    }

`;

module.exports = typeDefs;
