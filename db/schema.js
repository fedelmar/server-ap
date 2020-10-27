const { gql } = require('apollo-server');

const typeDefs = gql`

    type Usuario {
        id: ID
        nombre: String
        apellido: String
        email: String
        rol: String
        creado: String
    }

    type Producto {
        id: ID
        nombre: String
        categoria: String
        caja: String
        cantCaja: Int
        insumos: [ID]
    }
    
    type sProducto {
        id: ID
        lote: String
        producto: ID
        estado: EstadoProducto
        cantidad: Int
    }

    type Token {
        token: String
    }

    type Insumo {
        id: ID
        nombre: String
        categoria: String
    }

    type sInsumo {
        id: ID
        lote: String
        insumo: ID
        cantidad: Int
    }

    type sInsumoCompleto {
        id: ID
        lote: String
        insumo: String
        insumoID: ID
        cantidad: Int
        categoria: String
    }

    type lEsponjas {
        lote: String
        loteID: String
        estado: String
        caja: String
        producto: String
        cantidad: Int
        cantCaja: Int
    }

    type lPlacas {
        lote: String
        loteID: String
        estado: String
        caja: String
        producto: String
        catidad: Int
        cantCaja: Int
    }

    type ProductoTerminado {
        lote: String
        loteID: String
        estado: String
        caja: String
        producto: String
        cantidad: Int
        cantCaja: Int
    }

    type Cliente {
        id: ID
        nombre: String
        apellido: String
        empresa: String
        email: String
        telefono: String
        vendedor: ID
    }

    type PedidoGrupo {
        id: ID
        cantidad: Int
    }

    type Pedido {
        id: ID
        pedido: [PedidoGrupo]
        total: Float
        cliente: ID
        vendedor: ID
        fecha: String
        estado: EstadoPedido
    }

    type TopCliente {
        total: Float
        cliente: [Cliente]
    }

    type TopVendedor {
        total: Float
        vendedor: [Usuario]
    }

    scalar Date

    type LoteSalida {
        lote: String
        producto: String
        cantidad: Int
    }

    type Salida {
        id: ID
        fecha: Date
        cliente: String
        remito: String
        lotes: [LoteSalida]
    }

    type CPE {
        id: ID
        creado: Date
        modificado: Date
        operario: String
        lote: String
        producto: String
        lBolsa: String
        lEsponja: String
        cantProducida: Int
        cantDescarte: Int
        observaciones: String
        estado: Boolean
    }

    type CGE {
        id: ID
        creado: Date
        modificado: Date
        operario: String
        lote: String
        producto: String
        loteID: String
        caja: String
        descCajas: Int
        guardado: Int
        descarte: Int
        auxiliar: String
        observaciones: String
        estado: Boolean
    }

    type CPP {
        id: ID
        creado: Date
        modificado: Date
        operario: String
        lote: String
        producto: String
        lTapon: String
        lPlaca: String
        lPcm: String
        cantProducida: Int
        cantDescarte: Int
        observaciones: String
        estado: Boolean
    }

    type CGP {
        id: ID
        creado: Date
        modificado: Date
        operario: String
        lote: String
        producto: String
        loteID: String
        guardado: Int
        descarte: Int
        pallet: String
        auxiliar: String
        observaciones: String
        estado: Boolean
    }

    input UsuarioInput {
        nombre: String!
        apellido: String!
        email: String!
        rol: String!
        password: String!
    }

    input AutenticarInput {
        email: String!
        password: String!
    }

    input ProductoInput {
        nombre: String!
        categoria: String!
        caja: String
        cantCaja: Int
        insumos: [ID]
    }

    input sProductoInput {
        lote: String!
        producto: ID
        estado: EstadoProducto
        cantidad: Int
    }

    input InsumoInput {
        nombre: String!
        categoria: String!
    }
    
    input sInsumoInput {
        insumo: ID
        lote: String
        cantidad: Int   
    }

    input ClienteInput {
        nombre: String!
        apellido: String!
        empresa: String!
        email: String!
        telefono: String
    }

    input PedidoProductoInput {
        id: ID
        cantidad: Int
    }

    input PedidoInput {
        pedido: [PedidoProductoInput]
        cliente: ID
        estado: EstadoPedido
    }

    input lProductoInput {
        loteID: ID!
        lote: String!
        producto: String!
        cantidad: Int!
    }

    input SalidaInput {
        cliente: String!
        remito: String!
        lotes: [lProductoInput]
    }

    input CPEInput {
        operario: String
        lote: String
        producto: String
        lBolsa: String
        lEsponja: String
        cantProducida: Int
        cantDescarte: Int
        observaciones: String
        estado: Boolean
        modificado: Date
    }

    input CGEInput {
        operario: String
        lote: String
        producto: String
        loteID: String
        caja: String
        descCajas: Int
        guardado: Int
        descarte: Int
        auxiliar: String
        observaciones: String
        estado: Boolean
    }

    input CPPInput {
        operario: String
        lote: String
        producto: String
        productoID: String
        lTapon: String
        lPlaca: String
        lPcm: String
        cantProducida: Int
        cantDescarte: Int
        observaciones: String
        estado: Boolean
    }

    input CGPInput {
        operario: String
        lote: String
        producto: String
        loteID: String
        guardado: Int
        descarte: Int
        pallet: String
        auxiliar: String
        observaciones: String
        estado: Boolean
    }

    enum EstadoPedido {
        PENDIENTE
        COMPLETADO
        CANCELADO
    }

    enum EstadoProducto {
        Terminado
        Proceso
        Reproceso
    }

    type Query {

        # Usuarios
        obtenerUsuario: Usuario
        obtenerUsuarios: [Usuario]

        #-------------------------------#
        ###### PRODUCTOS E INSUMOS ######
        #-------------------------------#

        # Productos
        obtenerProductos: [Producto]
        obtenerProducto(id: ID!): Producto

        # Stock Productos
        obtenerProductosStock: [sProducto]
        obtenerProductoStock(id: ID!): sProducto
        existeProductoStock(id: ID!): Boolean
        obtenerStockEsponjas: [lEsponjas]
        obtenerStockPlacas: [lPlacas]
        obtenerProductosTerminados: [ProductoTerminado]

        # Insumos
        obtenerInsumos: [Insumo]
        obtenerInsumo(id: ID!): Insumo

        # Stock Insumos
        obtenerStockInsumos: [sInsumo]
        obtenerInsumoEnStock(id: ID!): sInsumo 
        existeInsumoStock(id: ID!): Boolean
        obtneterStockInsumosPorCategoria(input: String!): [sInsumoCompleto]
        obtenerInsumoPorLote(input: String!): sInsumo

        #---------------------#
        ###### REGISTROS ######
        #---------------------#

        # Planillas de control de Salidas
        obtenerRegistrosSalidas: [Salida]
        obtenerRegistroSalida(id: ID!): Salida
        obtenerLotesPorSalida(id: ID!): [LoteSalida] 

        # Planillas de control de produccion de Esponjas
        obtenerRegistrosCE: [CPE]
        obtenerRegistroCE(id: ID!): CPE

        # Planillas de contol de guardado de Esponjas
        obtenerRegistrosGE: [CGE]
        obtenerRegistroGE(id: ID!): CGE

        # Planillas de control de produccion de Placas
        obtenerRegistrosPP: [CPP]
        obtenerRegistroPP(id: ID!): CPP

        # Planillas de contol de guardado de Placas
        obtenerRegistrosGP: [CGP]
        obtenerRegistroGP(id: ID!): CGP

        #---------------------#
        ######## Otros ########
        #---------------------#

        # Clientes
        obtenerClientes: [Cliente]
        obtenerClientesVendedor: [Cliente]
        obtenerCliente(id: ID!): Cliente

        # Pedidos
        obtenerPedidos: [Pedido]
        obtenerPedidosVendedor: [Pedido]
        obtenerPedido(id: ID!): Pedido
        obtenerPedidosEstado(estado: String!): [Pedido]

        # Busquedas Avanzadas
        mejoresClientes: [TopCliente]
        mejoresVendedores: [TopVendedor]
        buscarProducto(texto: String!): [Producto]

    }

    type Mutation {

        # Usuarios
        nuevoUsuario(input: UsuarioInput): Usuario
        autenticarUsuario(input: AutenticarInput): Token

        #-------------------------------#
        ###### PRODUCTOS E INSUMOS ######
        #-------------------------------#

        # Productos
        nuevoProducto(input: ProductoInput): Producto
        actualizarProducto(id: ID!, input: ProductoInput): Producto
        eliminarProducto(id: ID!): String

        # Stock Productos
        nuevoProductoStock(input: sProductoInput): sProducto
        actualizarProductoStock(id: ID!, input: sProductoInput): sProducto
        eliminarProductoStock(id: ID!): String

        # Insumos
        nuevoInsumo(input: InsumoInput): Insumo
        actualizarInsumo(id: ID!, input: InsumoInput): Insumo
        eliminarInsumo(id: ID!): String

        # Stock Insumos
        nuevoInsumoStock(input: sInsumoInput): sInsumo
        actualizarInsumoStock(id: ID!, input: sInsumoInput): sInsumo
        eliminarInsumoStock(id: ID!): String

        #---------------------#
        ###### REGISTROS ######
        #---------------------#

        # Control de Salidas
        nuevoRegistroSalida(input: SalidaInput): Salida
        actualizarRegistroSalida(id: ID!, input: SalidaInput): Salida
        eliminarRegistroSalida(id: ID!): String

        # Control de produccion de Esponjas
        nuevoRegistroCE(id: ID, input: CPEInput): CPE
        actualizarRegistroCE(id: ID!, input: CPEInput): CPE
        eliminarRegistroCE(id: ID!): String

        # Control de guardado de Esponjas
        nuevoRegistroGE(id: ID, input: CGEInput): CGE
        actualizarRegistroGE(id: ID!, input: CGEInput): CGE
        eliminarRegistroGE(id: ID!): String

        # Control de produccion de Placas
        nuevoRegistroPP(id: ID, input: CPPInput): CPP
        actualizarRegistroPP(id: ID!, input: CPPInput): CPP
        eliminarRegistroPP(id: ID!): String

        # Control de guardado de Placas
        nuevoRegistroGP(id: ID, input: CGPInput): CGP
        actualizarRegistroGP(id: ID, input: CGPInput): CGP
        eliminarRegistroGP(id: ID!): String

        #---------------------#
        ######## Otros ########
        #---------------------#

        # Clientes
        nuevoCliente(input: ClienteInput): Cliente
        actualizarCliente(id: ID!, input: ClienteInput): Cliente
        eliminarCliente(id: ID!): String

        # Pedidos
        nuevoPedido(input: PedidoInput): Pedido
        actualizarPedido(id: ID!, input: PedidoInput): Pedido
        eliminarPedido(id: ID!): String
    }
`;

module.exports = typeDefs;
