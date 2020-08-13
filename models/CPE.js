const mongoose = require('mongoose');

const CPESchema = mongoose.Schema({
    fecha: {
        type: Date,
        required: true
    },
    operario: {
        type: String,
        required: true,
        trim: true
    },
    lote: {
        type: String,
        required: true,
        trim: true,
        unique: true 
    },
    horaInicio: {
        type: Date,
        required: true
    },
    horaCierre: {
        type: Date,
        required: true
    },
    Producto: {
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