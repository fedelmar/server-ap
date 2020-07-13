const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        obtenerProducto: String
    }
`;

module.exports = typeDefs;
