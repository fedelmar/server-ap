const mongoose = require('mongoose');

const CFESchema = mongoose.Schema({
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
    caja: {
        type: String,
        required: true,
        trim: true
    },
    descCajas: {
        type: Number
    },
    guardado: {
        type: Number,
        required: true,
    },
    descarte: {
        type: Number,
        required: true,
    },
    observaciones: {
        type: String
    },
});

module.exports = mongoose.model('CGE', CFESchema);