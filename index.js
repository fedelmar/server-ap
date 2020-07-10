const { ApolloServer, gql } = require('apollo-server');

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


const productos = [
    {
        nombre: "is1100",
        cat: "Esponjas"
    },
    {
        nombre: "is3500",
        cat: "Esponjas"
    },
    {
        nombre: "EP4",
        cat: "Placas"
    },
    {
        nombre: "Biogenesis 2k",
        cat: "Geles"
    }
];

const resolvers = {

    Query: {
        obtenerProductos: () => productos,
        obtenerCategoria: () => productos
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then( ({url}) => {
    console.log(`Servidor corriendo en ${url}`)
})