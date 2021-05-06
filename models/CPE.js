const mongoose = require('mongoose');

const CPESchema = mongoose.Schema({
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
    lBolsa: {
        type: String,
        required: true,
        trim: true
    },
    lEsponja: {
        type: String,
        required: true,
        trim: true
    },
    cantProducida: {
        type: Number
    },
    descarteBolsa: {
        type: Number
    },
    descarteEsponja: {
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

module.exports = mongoose.model('CPE', CPESchema);