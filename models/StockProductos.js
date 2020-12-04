const mongoose = require('mongoose');

const StockProductoSchema = mongoose.Schema({
    lote: {
        type: String,
        required: true
    },
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Producto'
    },
    estado: {
        type: String,
        trim: true
    },
    cantidad: {
        type: Number
    },    
    creado: {
        type: Date,
        default: Date.now()
    },
    modificado: {
        type: Date,
        default: Date.now()
    },
    responsable: {
        type: String
    }
});

module.exports = mongoose.model('StockProducto', StockProductoSchema);