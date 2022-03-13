const ContenedorFirebase = require('../../contenedores/contenedorFirebase')


class ProductosDAOFirebase extends ContenedorFirebase {
    constructor() {
        
        
        super('productos')
    }
}

module.exports = ProductosDAOFirebase