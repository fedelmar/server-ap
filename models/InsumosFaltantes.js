const mongoose = require("mongoose");

const InsumosFaltantesSchema = mongoose.Schema({
  faltantes: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
  },
});

InsumosFaltantesSchema.index( { "createdAt": 1 }, { expireAfterSeconds: 10 } )

module.exports = mongoose.model("InsumosFaltantes", InsumosFaltantesSchema);
