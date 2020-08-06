const mongoose = require('mongoose');

const ProducoSchema = mongoose.Schema({
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
    caja: {
        type: String,
        trim: true,
    },
    cantCaja: {
        type: String,
        trim: true,
        cantidad: Number
    },
    insumos: {
        type: Array,
        required: true
    }
});

ProducoSchema.index({ nombre: 'text' });

module.exports = mongoose.model('Producto', ProducoSchema);