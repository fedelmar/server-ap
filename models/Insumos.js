const mongoose = require('mongoose');

const InsumosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    categoria: {
        type: String,
        required: true,
        trim: true
    },
    cantidad: {
        type: Number,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Insumo', InsumosSchema);