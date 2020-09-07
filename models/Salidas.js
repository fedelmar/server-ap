const mongoose = require('mongoose');

const SalidasSchema = mongoose.Schema({
    fecha: {
        type: Date,
        default: new Date(Date.now())
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cliente'
    },
    remito: {
        type: String,
        required: true,
        trim: true
    },
    lProducto: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'StockProducto'
    },
    cantidad: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Salidas', SalidasSchema);