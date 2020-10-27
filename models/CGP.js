const mongoose = require('mongoose');

const CGPSchema = mongoose.Schema({
    creado: {
        type: Date,
    },
    modificado: {
        type: Date,
    },
    operario: {
        type: String,
        trim: true
    },
    lote: {
        type: String,
        trim: true
    },
    producto: {
        type: String,
        trim: true
    },
    loteID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StockProducto'
    },
    guardado: {
        type: Number
    },
    descarte: {
        type: Number
    },
    pallet: {
        type: String,
    },
    auxiliar: {
        type: String
    },
    observaciones: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('CGP', CGPSchema);