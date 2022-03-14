const Contenedor = require('../../contenedores/contenedor')



class CarritoDAO extends Contenedor {
    constructor() {
        
        
        super(
            [{id: 1, timestamp: 1644501352847, productos: []}]
        )
    }
}

module.exports = CarritoDAO