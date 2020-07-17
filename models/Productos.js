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
    cantidad: {
        type: Number,
        required: true,
        trim: true
    }
});

ProducoSchema.index({ nombre: 'text' });

module.exports = mongoose.model('Producto', ProducoSchema);