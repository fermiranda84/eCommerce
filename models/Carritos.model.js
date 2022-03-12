const mongoose = require('mongoose');
// import mongoose from "mongoose";

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

// export default CarritosModelo
module.exports = CarritosModelo