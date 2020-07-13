const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');

const conectarDB = require('./config/db');

//Conectar a la base de datos
conectarDB();

//Servidor
const server = new ApolloServer({
    typeDefs,
    resolvers
});

//Iniciar el servidor
server.listen().then( ({url}) => {
    console.log(`Servidor corriendo en ${url}`)
})