const { gql } = require('apollo-server');

const typeDefs = gql`

    type Usuario {
        id: ID
        nombre: String
        apellido: String
        email: String
        creado: String
    }

    type Producto {
        id: ID
        nombre: String
        categoria: String
        cantidad: Int
        creado: String
    }

    type Token {
        token: String
    }

    type Insumo {
        id: ID
        nombre: String
        categoria: String
        cantidad: Int
    }

    input UsuarioInput {
        nombre: String!
        apellido: String!
        email: String!
        password: String!
    }

    input AutenticarInput {
        email: String!
        password: String!
    }

    input ProductoInput {
        nombre: String!
        categoria: String!
        cantidad: Int!
    }

    input InsumoInput {
        nombre: String!
        categoria: String!
        cantidad: Int!
    }

    type Query {

        #Usuarios
        obtenerUsuario(token: String!): Usuario

        #Productos
        obtenerProductos: [Producto]
        obtenerProducto(id: ID!): Producto

        #Insumos
        obtenerInsumos: [Insumo]
        obtenerInsumo(id: ID!): Insumo
    }

    type Mutation {

        #Usuarios
        nuevoUsuario(input: UsuarioInput): Usuario
        autenticarUsuario(input: AutenticarInput): Token

        #Productos
        nuevoProducto(input: ProductoInput): Producto
        actualizarProducto(id: ID!, input: ProductoInput) : Producto

        #Insumos
        nuevoInsumo(input: InsumoInput): Insumo
    }
`;

module.exports = typeDefs;
