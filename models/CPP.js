const mongoose = require('mongoose');

const CPPSchema = mongoose.Schema({
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
    lTapon: {
        type: String,
        trim: true
    },
    lPlaca: {
        type: String,
        trim: true
    },
    lPcm: {
        type: String,
        trim: true
    },
    lPcmID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'StockInsumo'
    },
    cantProducida: {
        type: Number
    },
    cantDescarte: {
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

module.exports = mongoose.model('CPP', CPPSchema);