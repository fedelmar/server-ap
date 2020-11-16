const mongoose = require('mongoose');

const IngresosSchema = mongoose.Schema({
    lote: {
        type: String,
        trim: true
    },
    insumo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Insumo'
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