const InsumosFaltantes = require('../../models/InsumosFaltantes');

const nuevoInsumoFaltante = async (input) => {
    const existenInsumos = await InsumosFaltantes.find({});
    if (existenInsumos.length != 0) {
        console.log("Ya existen");
        return;
    }
    try {
        const nuevosFaltantes = new InsumosFaltantes({faltantes: input});
        const faltantes = await nuevosFaltantes.save();

        return faltantes;

    } catch (error) {
        console.log(error);
    }
};

const actualizarInsumoFaltante = async ( id, input ) => {
    let faltantes = await InsumosFaltantes.find({});
    if (faltantes. length == 0) {
        console.log("No existen Insumos faltantes");
        return;
    }
    faltantes = await InsumosFaltantes.findByIdAndUpdate( {_id: id} , {faltantes: input}, {
        new: true,
    });

    return faltantes;
};

const eliminarInsumoFaltante = async ( id, input ) => {
    let faltantes = await InsumosFaltantes.find({});
    if (!faltantes) {
        console.log("No existen insumos faltantes");
        return;
    }
    faltantes = await InsumosFaltantes.findByIdAndDelete({ _id: id })

    return "Insumos faltantes eliminados.";
};

module.exports = {
    nuevoInsumoFaltante,
    actualizarInsumoFaltante,
    eliminarInsumoFaltante,
}