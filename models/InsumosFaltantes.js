const mongoose = require('mongoose');

const InsumosFaltantesSchema = mongoose.Schema({
    faltantes: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('InsumosFaltantes', InsumosFaltantesSchema);