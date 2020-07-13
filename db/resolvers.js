const productos = [
    {
        nombre: "is1100",
        cat: "Esponjas"
    },
    {
        nombre: "is3500",
        cat: "Esponjas"
    },
    {
        nombre: "EP4",
        cat: "Placas"
    },
    {
        nombre: "Biogenesis 2k",
        cat: "Geles"
    }
];

const resolvers = {

    Query: {
        obtenerProductos: () => productos,
        obtenerProducto: (_, {input}, ctx) => {
            const resultado = productos.filter( producto => producto.cat === input.cat);
            return resultado;
        },
        obtenerCategoria: () => productos
    }
}

module.exports = resolvers;
