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
    tapon: {
        type: String,
        trim: true
    },
    placa: {
        type: String,
        trim: true
    },
    pcm: {
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