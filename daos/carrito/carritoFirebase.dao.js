const ContenedorFirebase = require('../../contenedores/contenedorFirebase')

class CarritoDAOFirebase extends ContenedorFirebase {
    constructor() {
        
        super(
            'carrito'
        )
    }
}

module.exports = CarritoDAOFirebase