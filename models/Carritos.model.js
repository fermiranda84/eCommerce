const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    foto: String,
    descripcion: String,
    stock: Number,
    codigo: String,
    timestamp: Number,
    idOriginal: String
});

const CarritosModelo = mongoose.model('carrito', carritoSchema);

module.exports = CarritosModelo