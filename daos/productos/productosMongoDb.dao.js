const ContenedorMongo = require('../../contenedores/contenedorMongoDb')
const mongoose = require('mongoose');



class ProductosDAOMongo extends ContenedorMongo {
    constructor() {
        
        
        super(
            'productos',
            new mongoose.Schema({
                nombre: String,
                precio: Number,
                foto: String,
                descripcion: String,
                stock: Number,
                codigo: String,
                timestamp: Number
            })
        )
    }
}

module.exports = ProductosDAOMongo