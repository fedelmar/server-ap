const mongoose = require('mongoose');

const IngresosSchema = mongoose.Schema({
    lote: {
        type: String,
        trim: true
    },
    insumoID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Insumo'
    },
    insumo: {
        type: String,
        trim: true
    },
    cantidad: {
        type: Number
    },
    remito: {
        type: String,
        trim: true
    },
    proveedor: {
        type: String,
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Ingresos', IngresosSchema);