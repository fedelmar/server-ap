const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const jwt = require('jsonwebtoken');
const conectarDB = require('./config/db');
const { job } = require('./service/job');
require('dotenv').config({ path:'variables.env' });


//Conectar a la base de datos
conectarDB();

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

//Servidor
const server = new ApolloServer({ 
    schema,
    context: ({req}) => {

        // console.log(req.headers);
                
       const token = req.headers['authorization'] || '';
       if(token) {
           try {
               const usuario = jwt.verify( token.replace('Bearer ', ''), process.env.SECRETA );
               // console.log(usuario);
               return {
                   usuario
               }
           } catch (error) {
               //console.log('Hubo un error');
               console.log(error);
           }
       }
    }
});

//Iniciar el servidor
server.listen({port: process.env.PORT || 4000}).then( ({url}) => {
    // programar la tarea para que se ejecute a las 9:30 a.m. el primer día del mes
    job();
    console.log(`Servidor corriendo en ${url}`)
})