const mongoose = require('mongoose');

const ProducoSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true,
        unique: true 
    },
    categoria: {
        type: String,
        require: true,
        trim: true
    },
    cantidad: {
        type: Number,
        require: true,
        trim: true
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Producto', ProducoSchema);