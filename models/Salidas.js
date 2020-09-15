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
    lotes: [{
        loteID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'StockProducto'
        },
        lote: {
            type: String,
            required: true
        },
        producto: {
            type: String,
            required: true
        },
        cantidad: {
            type: Number,
            required: true,
        },
    }]
    
});

module.exports = mongoose.model('Salidas', SalidasSchema);