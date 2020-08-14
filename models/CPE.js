const mongoose = require('mongoose');

const CPESchema = mongoose.Schema({
    fecha: {
        type: Date,
        default: new Date(Date.now())
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
    horaInicio: {
        type: String,
        required: true
    },
    horaCierre: {
        type: String,
        required: true
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
    cantProductida: {
        type: Number,
        required: true,
    },
    cantDescarte: {
        type: Number,
        required: true,
    },
    observaciones: {
        type: String
    },
});

module.exports = mongoose.model('CPE', CPESchema);