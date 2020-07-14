const Usuario = require('../models/Usuarios');
const Producto = require('../models/Productos');
const Insumo = require('../models/Insumos');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Productos = require('../models/Productos');
require('dotenv').config({ path:'variables.env' });

const crearToken = (usuario, secreta, expiresIn) => {
    //console.log(usuario);
    const { id, email, nombre, apellido } = usuario;
    return jwt.sign( {id, email, nombre, apellido }, secreta, { expiresIn } )
}

//RESOLVERS
const resolvers = {

    Query: {
        
        obtenerUsuario: async (_, { token }) => {
            const usuarioId = await jwt.verify( token, process.env.SECRETA )

            return usuarioId
        },

        obtenerProductos: async () => {
            try {
                const productos = await Producto.find({});
                return productos;
            } catch (error) {
                console.log(error);
            }
        },

        obtenerProducto: async (_, { id }) => {
            //Comprobar existencia del producto
            const producto = await Producto.findById(id);

            if (!producto) {
                throw new Error('Producto no encontrado');
            }

            return producto;
        },

        obtenerInsumos: async () => {
            try {
                const insumos = await Insumo.find({});
                return insumos;
            } catch (error) {
                console.log(error);
            }
        },

        obtenerInsumo: async (_, { id }) => {
            
            const insumo = await Insumo.findById(id);

            if(!insumo) {
                throw new Error('Insumo no encontrado');
            }

            return insumo;
        }
    },
    Mutation: {

        nuevoUsuario: async (_, { input }) => {

            const { email, password } = input;

            //Verificar si ya existe el usuario
            const existeUsuario = await Usuario.findOne({email});
            if (existeUsuario) {
                throw new Error('El usuario ya esta registrado');
            }

            //Codificar password
            const salt = await bcryptjs.genSalt(10);
            input.password = await bcryptjs.hash(password, salt);

            //Guardar en la base de datos
            try {
                const usuario = new Usuario(input);
                usuario.save();
                return usuario;
            } catch (error) {
                console.log(error);
            }
        },

        autenticarUsuario: async (_, {input}) => {

            const { email, password } = input;

            //Verificar si ya existe el usuario
            const existeUsuario = await Usuario.findOne({email});
            if (!existeUsuario) {
                throw new Error('Email incorrecto');
            }

            //Comprobar validez de password
            const passwordCorrecto = await bcryptjs.compare( password, existeUsuario.password );
            if (!passwordCorrecto) {
                throw new Error('Contraseña incorrecta');
            }

            //Generar Token
            return {
                token: crearToken(existeUsuario, process.env.SECRETA, '24h' ),
            }
        },

        nuevoProducto: async (_, {input}) => {
            try {
                const producto = new Producto(input);

                //Guardar en db
                const resultado = await producto.save();

                return resultado;
            } catch (error) {
                console.log(error);
            }
        },

        actualizarProducto: async (_, { id, input }) => {
            //Comprobar existencia del producto
            let producto = await Producto.findById(id);

            if (!producto) {
                throw new Error('Producto no encontrado');
            }

            producto = await Producto.findByIdAndUpdate( { _id: id }, input, { new: true } );

            return producto;
        },

        nuevoInsumo: async (_, {input}) => {
            try {
                const nuevoInsumo = new Insumo(input);

                //Guardar en db
                const insumo = await nuevoInsumo.save();

                return insumo;
            } catch (error) {
                console.log(error);
            }
        }
    }

}

module.exports = resolvers;
