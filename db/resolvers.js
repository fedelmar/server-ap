const Usuario = require('../models/Usuarios');
const Producto = require('../models/Productos');
const Insumo = require('../models/Insumos');
const Cliente = require('../models/Clientes');
const Pedido = require('../models/Pedidos');
const StockInsumo = require('../models/StockInsumos');
const StockProducto = require('../models/StockProductos');
const CPE = require('../models/CPE');
const CGE = require('../models/CGE');
const Salida = require('../models/Salidas');


const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path:'variables.env' });

const crearToken = (usuario, secreta, expiresIn) => {
    //console.log(usuario);
    const { id, email, nombre, apellido, rol } = usuario;
    return jwt.sign( {id, email, nombre, apellido, rol }, secreta, { expiresIn } )
}

//RESOLVERS
const resolvers = {

    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
          return new Date(value); // value from the client
        },
        serialize(value) {
          return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
          if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
          }
          return null;
        },
    }),

    Query: {
        
        obtenerUsuario: async (_, { }, ctx) => {
            return ctx.usuario;
        },

        obtenerUsuarios: async () => {
            try {
                const usuarios = await Usuario.find({});
                return usuarios
            } catch (error) {
                console.log(error);
            }
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

        obtenerProductosStock: async () => {
            try {
                const lote = await StockProducto.find({});
                return lote;
            } catch (error) {
                console.log(error);
            }
        },

        obtenerProductoStock: async (_, { id }) => {
            // Comprobar existencia del lote
            const lote = await StockProducto.findById(id);

            if (!lote) {
                throw new Error('Lote no encontrado');
            }

            return lote;
        },

        existeProductoStock: async (_, { id }) => {
            // Comprobar su existencia
            const lote = await StockProducto.findOne({producto: id})
            if (lote) {
                return true
            } else {
                return false
            }
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

        obtenerStockInsumos: async () => {
            try {
                const insumos = await StockInsumo.find({});
                return insumos;
            } catch (error) {
                console.log(error)
            }
        },

        obtenerInsumoEnStock: async (_, { id }) => {
            const insumo = await StockInsumo.findById(id);

            if(!insumo) {
                throw new Error('El insumos no existe en el Stock');
            }

            return insumo;
        },

        existeInsumoStock: async (_, { id }) => {
            // Comprobar su existencia
            const lote = await StockInsumo.findOne({insumo: id})
            
            if (lote) {
                return true
            } else {
                return false
            }
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
                if (ctx.usuario) {
                const clientes = await Cliente.find({ vendedor: ctx.usuario.id.toString() });
                return clientes;
                }
            } catch (error) {
                console.log(error);
            }
        },

        obtenerPedidos: async () => {
            try {
                const pedidos = await Pedidos.find({});
                return pedidos;
            } catch (error) {
                console.log(error);
            }
        },

        obtenerPedidosVendedor: async (_, {}, ctx) => {
            try {
                const pedidos = await Pedido.find({ vendedor: ctx.usuario.id });
                return pedidos;
            } catch (error) {
                console.log(error);
            }
        },

        obtenerPedido: async (_, {id}, ctx) => {
                //Verificar su existencia
                const pedido = await Pedido.findById(id);
                if(!pedido) {
                    throw new Error('Pedido no encontrado');
                }

                //Solo lo ve su vendedor
                if(pedido.vendedor.toString() !== ctx.usuario.id){
                    throw new Error('Acción no permitida');
                }
                
                //Retornar resultado
                return pedido;
        },

        obtenerPedidosEstado: async (_, { estado }, ctx) => {
            const pedidos = await Pedido.find({ vendedor: ctx.usuario.id, estado});

            return pedidos;
        },

        mejoresClientes: async () => {
            const clientes = await Pedido.aggregate([
                { $match: { estado: "COMPLETADO" }},
                { $group: {
                    _id: "$cliente",
                    total: { $sum: "$total"}
                }},
                {
                    $lookup: {
                        from: 'clientes',
                        localField: '_id',
                        foreignField: "_id",
                        as: "cliente"
                    }   
                },
                {
                    $sort: { total:  -1}
                }
            ])
        },

        mejoresVendedores: async () => {
            const vendedores = await Pedido.aggregate([
                { $match: { estado: "COMPLETADO" }},
                { $group: {
                    _id: "vendedor",
                    total: { $sum: "$total"}
                }},
                {
                    $lookup: {
                        from: 'usuarios',
                        localField: '_id',
                        foreignField: '_id',
                        as: "vendedor"
                    }
                },
                {
                    $limit: 3
                },
                {
                    $sort: { total: -1}
                }
            ]);

            return vendedores;
        },

        buscarProducto: async (_, { texto }) => {
            const productos = await Producto.find({$text: { $search: texto }})

            return productos;
        },

        obtenerRegistrosCE: async () => {

            let registros = await CPE.find({});
            
            return registros;
        },

        obtenerRegistroCE: async (_, {id}) => {
            let registro = await CPE.findById(id);
            
            if(!registro) {
                throw new Error('Registro no encontrado');
            }

            return registro;
        },

        obtenerRegistrosGE: async () => {

            let registros = await CGE.find({});
            
            return registros;
        },

        obtenerRegistroGE: async (_, {id}) => {
            let registro = await CGE.findById(id);
            
            if(!registro) {
                throw new Error('Registro no encontrado');
            }

            return registro;
        },

        obtenerStockEsponjas: async () => {
            let listaProductos = await Producto.find({});
            let stockProductos = await StockProducto.find({});            
    
            let lotesEsponjas = [];

            stockProductos.forEach(function(loteProducto) {
                listaProductos.forEach(function(producto) {
                    if (producto.id == loteProducto.producto && producto.categoria == 'Esponjas' && loteProducto.estado != 'Terminado') {
                        lotesEsponjas.push({
                            lote: loteProducto.lote,
                            loteID: loteProducto.id,
                            estado: loteProducto.estado,
                            cantidad: loteProducto.cantidad,
                            producto: producto.nombre,
                            caja: producto.caja,
                            cantCaja: producto.cantCaja
                        })
                    }
                })
            })

            return lotesEsponjas;
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


        nuevoProductoStock: async (_, {input}) => {

            // Verificar la existencia del producto en stock
            const { lote, producto } = input;
            const existeLote = await StockProducto.findOne({lote});
            if (existeLote && existeLote.producto == producto && existeLote.estado == "Proceso") {

                    // Si ya hay un lote en existencia, sumar la cantidad producida
                    let nuevoInput = input;
                    nuevoInput.cantidad += existeLote.cantidad;
                    nuevoLote = await StockProducto.findByIdAndUpdate( {_id: existeLote.id },  nuevoInput, { new: true });  
                    
                    return nuevoLote;
              
            } else {
                try {
                    const producto = new StockProducto(input);

                    //Guardar en db
                    const resultado = await producto.save();

                    return resultado;
                } catch (error) {
                    console.log(error)
                }
            }
            
        },

        actualizarProductoStock: async (_,{ id, input }) => {
            //Comprobar existencia en stock del producto
            let lote = await StockProducto.findById(id);
            if (!lote) {
                throw new Error('Lote no encontrado');
            }

            lote = await StockProducto.findByIdAndUpdate( {_id: id }, input, { new: true });

            return lote;
        },

        eliminarProductoStock: async (_, { id }) => {
            let lote = await StockProducto.findById(id);
            
            if (!lote) {
                throw new Error('Lote no encontrado');
            }

            lote = await StockProducto.findByIdAndDelete({ _id: id });

            return "Lote eliminado.";
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

        nuevoInsumoStock: async (_, {input}) => {

            // Verificar del la existencia del insumo en Stock
            const { lote } = input;
            const existeInsumo = await StockInsumo.findOne({lote});
            if (existeInsumo) {
                throw new Error('Ya existe ese lote');
            }

            try {
                const nuevoLote = new StockInsumo(input);

                const lote = await nuevoLote.save();

                return lote;
            } catch (error) {
                console.lot(error);
            }
        },

        actualizarInsumoStock: async (_, { id, input }) => {
            //Comprobar existencia del insumo en stock
            let insumo = await StockInsumo.findById(id);

            if (!insumo) {
                throw new Error('No existe el insumo en stock')
            }
            if (input.cantidad !== 0) {
                insumo = await StockInsumo.findByIdAndUpdate( {_id: id}, input, { new: true });
            } else {
                insumo = await StockInsumo.findByIdAndDelete({_id: id})
            }          
            
            return insumo;            
        },

        eliminarInsumoStock: async (_, { id }) => {

            //Comprobar existencia del insumo en stock
            let lote = await StockInsumo.findById(id);

            if (!lote) {
                throw new Error('No existe el insumo en stock')
            }

            lote = await Insumo.findByIdAndDelete({ _id: id });

            return "Lote eliminado del stock.";

        },

        nuevoCliente: async (_, { input }, ctx) => {

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
            if(cliente.vendedor.toString() !== ctx.usuario.id) {
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
        },

        actualizarPedido: async (_,{id, input}, ctx) => {
            
            const { cliente } = input;

            //Verificar si existe
            const existePedido = await Pedido.findById(id);
            if(!existePedido) {
                throw new Error('Pedido no encontrado');
            }

            //Verificar cliente
            const existeCliente = await Cliente.findById(cliente);
            if(!existeCliente) {
                throw new Error('Cliente no encontrado');
            }

            //Verificar vendedor
            if(existeCliente.vendedor.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales.');
            }

            //Revisar el stock
            if (input.pedido) {
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
            }
            
            //Guardar en DB
            resultado = await Pedido.findOneAndUpdate({_id: id}, input, {new: true});
            return resultado;
        },

        eliminarPedido: async (_, {id}, ctx) => {
            //Verificar si existe
            let pedido = await Pedido.findById(id);
            if(!pedido) {
                throw new Error('Pedido no encontrado');
            }

            if(pedido.vendedor.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales.');
            } 

            await Pedido.findByIdAndDelete(id);
            return 'Pedido eliminado'
        },

        nuevoRegistroSalida: async (_, {input}) => {

            const { cantidad, lProducto } = input;

            let lote = await StockProducto.findById({ _id: lProducto});
            try {

                // Actualizar info en el lote del producto                
                if(lote.cantidad > cantidad) {
                    lote.cantidad -= cantidad;
                    await StockProducto.findByIdAndUpdate({_id: lProducto}, lote, {new: true})
                } else {
                    await StockProducto.findByIdAndDelete({_id: lProducto})
                }
                
                // Guardar registro en DB
                const registro = new Salida(input);
                const resultado = await registro.save();
                return resultado;
            } catch (error) {
                console.log(error);
            }
        },

        actualizarRegistroSalida: async (_, {id, input}) => {
            // Buscar existencia de planilla por ID
            let registro = await Salida.findById(id);
            if(!registro) {
                throw new Error('Registro no encontrado');
            }

            //Actualizar DB
            registro = await Salida.findByIdAndUpdate( {_id: id}, input, { new: true });
            
            return registro; 
        },

        nuevoRegistroCE: async (_, {input}) => {
            try {
                const planilla = new CPE(input);

                //Guardar en DB
                const resultado = await planilla.save();

                return resultado;
            } catch (error) {
                console.log(error);
            }
        },

        actualizarRegistroCE: async (_, {id, input}) => {
            // Buscar existencia de planilla por ID
            let registro = await CPE.findById(id);
            if(!registro) {
                throw new Error('Registro no encontrado');
            }

            //Actualizar DB
            registro = await CPE.findByIdAndUpdate( {_id: id}, input, { new: true });
            
            return registro; 

        },

        eliminarRegistroCE: async (_, { id }) => {
            // Buscar existencia de planilla por ID
            let registro = await CPE.findById(id);
            if(!registro) {
                throw new Error('Registro no encontrado');
            }

            registro = await CPE.findByIdAndDelete({ _id: id });

            return "Registro eliminado.";
        },

        nuevoRegistroGE: async (_, {input}) => {
            const { loteID, guardado, descarte } = input;

            let lote = await StockProducto.findById({ _id: loteID});
                        
            try {
                // Actualizar info en el lote del producto                
                if(lote.cantidad > guardado) {
                    lote.cantidad -= guardado - descarte;
                    await StockProducto.findByIdAndUpdate({_id: loteID}, lote, {new: true})

                    // Crear nuevo lote terminado
                    const nuevoLote = {
                        lote: lote.lote,
                        estado: "Terminado",
                        cantidad: guardado - descarte,
                        producto: lote.producto                        
                    }
                    const loteTermiado = new StockProducto(nuevoLote);
                    await loteTermiado.save();
                } else {
                    lote.estado = "Terminado";
                    await StockProducto.findByIdAndUpdate({_id: loteID}, lote, {new: true})
                }
                                
                // Crear y guardar nuevo registro
                const registro = new CGE(input);
                const resultado = await registro.save();

                return resultado;
            } catch (error) {
                console.log(error);
            }
        },

        actualizarRegistroGE: async (_, { id, input }) => {
            // Buscar existencia de planilla por ID
            let registro = await CGE.findById(id);
            if(!registro) {
                throw new Error('Registro no encontrado');
            }

            //Actualizar DB
            registro = await CGE.findByIdAndUpdate( {_id: id}, input, { new: true });
            
            return registro; 
        },

        eliminarRegistroGE: async(_, { id }) => {
            // Buscar existencia de planilla por ID
            let registro = await CGE.findById(id);

            if(!registro) {
                throw new Error('Registro no encontrado');
            }

            registro = await CGE.findByIdAndDelete({ _id: id });

            return "Registro eliminado.";
        }
    }

}

module.exports = resolvers;
