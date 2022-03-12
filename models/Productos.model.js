const mongoose = require('mongoose');
// import mongoose from "mongoose";

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

// export default ProductosModelo
module.exports = ProductosModelo
