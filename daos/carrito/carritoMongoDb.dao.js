const ContenedorMongo = require('../../contenedores/contenedorMongoDb');
// import ContenedorMongo from "../../contenedores/contenedorMongoDb.js"
const mongoose = require('mongoose');



class CarritoDAOMongo extends ContenedorMongo {
    constructor() {
        
        
        super(
            'carrito',
            new mongoose.Schema({
                    nombre: String,
                    precio: Number,
                    foto: String,
                    descripcion: String,
                    stock: Number,
                    codigo: String,
                    timestamp: Number,
                    idOriginal: String
            })
        )
    }
}

// export default ProductosDAOMongo
module.exports = CarritoDAOMongo