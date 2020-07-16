const Usuario = require('../models/Usuarios');
const Producto = require('../models/Productos');
const Insumo = require('../models/Insumos');
const Cliente = require('../models/Clientes');
const Pedido = require('../models/Pedidos');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
        },

        obtenerCliente: async (_, {id}, ctx ) => {
            //Verificar existencia
            const cliente = await Cliente.findById(id);

            if (!cliente) {
                throw new Error('Cliente no encontrado');
            }

            if(cliente.vendedor.toString() !== ctx.usuario.id ) {
                throw new Error('No tienes las credenciales.');
            } 

            return cliente;
        },

        obtenerClientes: async () => {
            try {
                const clientes = await Cliente.find({});
                return clientes;
            } catch (error) {
                console.log(error);
            }
        },

        obtenerClientesVendedor: async (_, {}, ctx ) => {
            try {
                const clientes = await Cliente.find({ vendedor: ctx.usuario.id.toString() });
                return clientes;
            } catch (error) {
                console.log(error);
            }
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

            //Verificar existencia del producto
            const { nombre } = input;
            const existeProducto = await Producto.findOne({nombre});
            if (existeProducto) {
                throw new Error('Ya existe ese producto');
            }

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

        eliminarProducto: async (_, { id } ) => {
            let producto = await Producto.findById(id);
            
            if (!producto) {
                throw new Error('Producto no encontrado');
            }

            producto = await Producto.findByIdAndDelete({ _id: id });

            return "Producto eliminado.";

        },

        nuevoInsumo: async (_, {input}) => {
            
            //Verificar existencia del insumo
            const { nombre } = input;
            const existeInsumo = await Insumo.findOne({nombre});
            if (existeInsumo) {
                throw new Error('Ya existe ese insumo');
            }
            
            try {
                const nuevoInsumo = new Insumo(input);

                //Guardar en db
                const insumo = await nuevoInsumo.save();

                return insumo;
            } catch (error) {
                console.log(error);
            }
        },

        actualizarInsumo: async (_, { id, input }) => {
            //Comprobar existencia del insumo
            let insumo = await Insumo.findById(id);

            if (!insumo) {
                throw new Error('Insumo no encontrado');
            }

            insumo = await Insumo.findByIdAndUpdate( { _id: id }, input, { new: true } );

            return insumo;
        },

        eliminarInsumo: async (_, { id } ) => {
            let insumo = await Insumo.findById(id);
            
            if (!insumo) {
                throw new Error('Insumo no encontrado');
            }

            insumo = await Insumo.findByIdAndDelete({ _id: id });

            return "Insumo eliminado.";

        },

        nuevoCliente: async (_, { input }, ctx) => {

            console.log(ctx);

            //Verificar si ya existe el cliente
            const { email } = input
            const cliente = await Cliente.findOne({ email });
            if(cliente) {
                throw new Error('Ya existe el cliente');
            }

            const nuevoCliente = new Cliente(input);

            //Asignar el vendedor
            nuevoCliente.vendedor = ctx.usuario.id;

            //Guardar en DB
            try {
                const resultado = await nuevoCliente.save();
                return resultado; 
            } catch (error) {
                console.log(error);
            }            
        },

        actualizarCliente: async (_, {id, input}, ctx) => {
            //Verificar existencia
            let cliente = await Cliente.findById(id);
            if (!cliente) {
                throw new Error('El cliente no existe');
            }

            //Verificar si edita el vendedor
            if(cliente.vendedor.toString() !== ctx.usuario.id ) {
                throw new Error('No tienes las credenciales.');
            } 

            //Guardar en db
            cliente = await Cliente.findOneAndUpdate({_id: id}, input, {new: true});
            return cliente;
        },

        eliminarCliente: async (_, { id }, ctx) => {
            //Verificar existencia
            let cliente = await Cliente.findById(id);
            if (!cliente) {
                throw new Error('El cliente no existe');
            }
            
            //Verificar si edita el vendedor
            if(cliente.vendedor.toString() !== ctx.usuario.id ) {
                throw new Error('No tienes las credenciales.');
            } 
            
           //Eliminar el cliente
           await Cliente.findOneAndDelete({_id: id});
           return 'Cliente eliminado'; 
        },

        nuevoPedido: async (_, {input}, ctx) => {
            
            const { cliente } = input
            
            //Verificar existencia de cliente
            let existeCliente = await Cliente.findById(cliente);
            if (!existeCliente) {
                throw new Error('El cliente no existe');
            }

            //Verificar si pertenece al vendedor
            if(existeCliente.vendedor.toString() !== ctx.usuario.id ) {
                throw new Error('No tienes las credenciales.');
            }

            //Verificar stock
            for await ( const articulo of input.pedido ) {
                const { id } = articulo;
                  
                const producto = await Producto.findById(id);

                if(articulo.cantidad > producto.cantidad) {
                    throw new Error(`El articulo: ${producto.nombre} exede la cantidad disponible`);
                } else {
                    //Descontar articulos del stock
                    producto.cantidad = producto.cantidad - articulo.cantidad;

                    await producto.save();
                } 
            }

            //Crear nuevo pedido
            const nuevoPedido = new Pedido(input);

            //Asignar vendedor
            nuevoPedido.vendedor = ctx.usuario.id;

            //Guardar en DB
            const resultado = await nuevoPedido.save();
            return resultado;
        }
    }

}

module.exports = resolvers;
