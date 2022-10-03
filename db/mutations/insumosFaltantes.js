const InsumosFaltantes = require('../../models/InsumosFaltantes');

const nuevoInsumoFaltante = async (_, { input }) => {
    // const { stringFaltantes } = input;
    // console.log(stringFaltantes);
    // const existenInsumos = await InsumosFaltantes.find({});
    // if (existenInsumos) {
    //     throw new Error("Ya existen");
    // }
    // try {
    //     const nuevosFaltantes = new InsumosFaltantes(input);
    //     const faltantes = await nuevosFaltantes.save();

    //     return faltantes;

    // } catch (error) {
    //     console.log(error);
    // }
};

const actualizarInsumoFaltante = async (_, { id, input }) => {
    let faltantes = await InsumosFaltantes.find({});
    if (!faltantes) {
        throw new Error("No existen Insumos faltantes");
    }
    faltantes = await InsumosFaltantes.findByIdAndUpdate({ _id: id }, input, {
        new: true,
    });

    return faltantes;
};

const eliminarInsumoFaltante = async (_, { id, input }) => {
    let faltantes = await InsumosFaltantes.find({});
    if (!faltantes) {
        throw new Error("No existen insumos faltantes");
    }
    faltantes = await InsumosFaltantes.findByIdAndDelete({ _id: id })

    return "Insumos faltantes eliminados.";
};

module.exports = {
    nuevoInsumoFaltante,
    actualizarInsumoFaltante,
    eliminarInsumoFaltante,
}