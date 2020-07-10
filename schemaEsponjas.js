const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`

    type Bolsas implements Insumos {
        nombre: String!
        cantidad: Int
    }

    type Carton implements Insumos {
        nombre: String!
        cantidad: Int
    }

    type Esponjas implements Insumos {
        nombre: String!
        cantidad: Int
    }   

    interface Insumos {
        nombre: String!
        cantidad: Int
    }

    type Producto {
        nombre: String
    }

    type Categoria {
        cat: String
    }

    type Query {
        obtenerProductos: [Producto]
        obtenerCategoria: [Categoria]
        getInsumos: [Insumos]
        getCarton: [Carton]
        getEsponjas: [Esponjas]
        getBolsas: [Bolsas]
    }

`; 

const insumos = [
    {
        nombre: "is1100",
        cantidad: 4
    },
    {
        nombre: "Caja Reforzada",
        cantidad: 10
    },
    {
        nombre: "Caja Empaque 3500",
        cantidad: 1
    },
    {
        nombre: "ts1000",
        cantidad: 55
    }
];

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
        obtenerCategoria: () => productos,
        getInsumos: () => insumos
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then( ({url}) => {
    console.log(`Servidor corriendo en ${url}`)
})