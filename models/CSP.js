const mongoose = require('mongoose');

const CSPSchema = mongoose.Schema({
    creado: {
        type: Date,
    },
    modificado: {
        type: Date,
    },
    operario: {
        type: String,
        required: true,
        trim: true
    },
    lote: {
        type: String,
        required: true,
        trim: true
    },
    loteID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StockProducto'
    },
    producto: {
        type: String,
        required: true,
        trim: true
    },
    sellado: {
        type: Number
    },
    descarte: {
        type: Number
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

module.exports = mongoose.model('CSP', CSPSchema);