const mongoose = require('mongoose')

const productoSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    foto: String,
    descripcion: String,
    stock: Number,
    codigo: String,
    timestamp: Number
});

const ProductosModelo = mongoose.model('productos', productoSchema);


module.exports = ProductosModelo
