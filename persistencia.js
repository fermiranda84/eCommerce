const fs = require('fs')

module.exports = {
    persProductos: (listaProductos) => {
        try{
    
            fs.readFile('./productos.txt', 'utf-8', (error, contenido) => {
               if (error) {
                   throw new Error(error);
               } else {
    
                    fs.writeFile('./productos.txt', JSON.stringify(listaProductos, null, 2), error => {
                        if (error) { throw new Error(error)}
                        else {console.log('Producto agregado al filesystem')}
                    })
                }
            })
    
        }
    
        catch (error) {console.error(error)}
    },

    persCarrito: (listaCarritos) => {
        try{
    
            fs.readFile('./carritos.txt', 'utf-8', (error, contenido) => {
               if (error) {
                   throw new Error(error);
               } else {
    
                    fs.writeFile('./carritos.txt', JSON.stringify(listaCarritos, null, 2), error => {
                        if (error) { throw new Error(error)}
                        else {console.log('Carrito agregado al filesystem')}
                    })
                }
            })
    
        }
    
        catch (error) {console.error(error)}
    }
} 





