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
    }
});

module.exports = mongoose.model('StockInsumo', StockInsumosSchema);