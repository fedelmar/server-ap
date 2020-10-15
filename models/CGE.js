const mongoose = require('mongoose');

const CFESchema = mongoose.Schema({
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
    producto: {
        type: String,
        required: true,
        trim: true
    },
    loteID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'StockProducto'
    },
    caja: {
        type: String,
        required: true,
        trim: true
    },
    descCajas: {
        type: Number
    },
    guardado: {
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

module.exports = mongoose.model('CGE', CFESchema);