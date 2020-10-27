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
    cantProducida: {
        type: Number
    },
    cantDescarte: {
        type: Number
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