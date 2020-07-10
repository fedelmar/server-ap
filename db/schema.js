const { gql } = require('apollo-server');

const typeDefs = gql`

    type Producto {
        nombre: String
    }

    type Categoria {
        cat: String
    }

    type Query {
        obtenerProductos: [Producto]
        obtenerCategoria: [Categoria]
    }

`;

module.exports = typeDefs;
