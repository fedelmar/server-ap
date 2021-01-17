const mongoose = require('mongoose');

const PGSchema = mongoose.Schema({
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
    llenado: {
        type: Boolean,
        default: true
    },
    cantidad: {
        type: Number,
    },
    loteInsumo: {
        type: String,
    },
    loteInsumoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StockInsumo'
    },
    tanque: {
        type: Number,
    },
    observaciones: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('PG', PGSchema);