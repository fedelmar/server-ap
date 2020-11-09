const mongoose = require('mongoose');

const StockInsumosSchema = mongoose.Schema({
    lote: {
        type: String,
        required: true,
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
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('StockInsumo', StockInsumosSchema);