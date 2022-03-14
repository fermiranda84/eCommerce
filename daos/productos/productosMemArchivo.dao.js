const Contenedor = require('../../contenedores/contenedor');

class ProductosDAO extends Contenedor {
    constructor() {
        
        
        super(
            [
                {id: 1, timestamp: 1644501352847, nombre: 'Martillo', descripcion: 'Mango ergonómico de fibra de vidrio ultra resistente.', codigo: 'M124', foto: 'https://http2.mlstatic.com/D_NQ_NP_778994-MLA48637163054_122021-O.webp', precio: 1275, stock: 10},
                {id: 2, timestamp: 1644501352847, nombre: 'Pinza Universal', descripcion: 'Pinza Universal 180 mm Mango Soft Touch', codigo: 'M128', foto: 'https://http2.mlstatic.com/D_NQ_NP_850195-MLA45726230545_042021-O.webp', precio: 819, stock: 25},
            ]
        )
    }
}


module.exports = ProductosDAO