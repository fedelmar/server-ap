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

    type CPE {
        id: ID
        fecha: Date
        operario: String
        lote: String
        horaInicio: String
        horaCierre: String
        producto: String
        lBolsa: String
        lEsponja: String
        cantProductida: Int
        cantDescarte: Int
        observaciones: String
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

    input CPEInput {
        fecha: Date
        operario: String!
        lote: String!
        horaInicio: String!
        horaCierre: String!
        producto: String!
        lBolsa: String
        lEsponja: String
        cantProducida: Int!
        cantDescarte: Int!
        observaciones: String
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

        # Productos
        obtenerProductos: [Producto]
        obtenerProducto(id: ID!): Producto

        # Stock Productos
        obtenerProductosStock: [sProducto]
        obtenerProductoStock(id: ID!): sProducto

        # Insumos
        obtenerInsumos: [Insumo]
        obtenerInsumo(id: ID!): Insumo

        # Stock Insumos
        obtenerStockInsumos: [sInsumo]
        obtenerInsumoEnStock(id: ID!): sInsumo 

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

        # Planilla de gestion de produccion de Esponjas
        obtenerRegistrosCE: [CPE]
        obtenerRegistroCE(id: ID!): CPE
    }

    type Mutation {

        # Usuarios
        nuevoUsuario(input: UsuarioInput): Usuario
        autenticarUsuario(input: AutenticarInput): Token

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

        # Clientes
        nuevoCliente(input: ClienteInput): Cliente
        actualizarCliente(id: ID!, input: ClienteInput): Cliente
        eliminarCliente(id: ID!): String

        # Pedidos
        nuevoPedido(input: PedidoInput): Pedido
        actualizarPedido(id: ID!, input: PedidoInput): Pedido
        eliminarPedido(id: ID!): String

        # Registro de gestion de produccion de Esponjas
        nuevoRegistroCE(input: CPEInput): CPE
        actualizarRegistroCE(id: ID!, input: CPEInput): CPE
        eliminarRegistroCE(id: ID!): String
    }
`;

module.exports = typeDefs;
