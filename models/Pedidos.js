const mongoose = require('mongoose');

const PedidosSchema = mongoose.Schema({
    pedido: {
        type: Array,
        required: true,
    },
    total: {
        total: Number,
        required: true,
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cliente'
    },
    vendedor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    estado: {
        type: String,
        default: "PENDIENTE"
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Pedido', PedidosSchema);