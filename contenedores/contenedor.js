//Creo la clase contenedor con el nombre del archivo y el array que voy a utilizar con el constructor
class Contenedor {
    

    constructor (lista) {
    
        this.lista = lista
    }

    //Metodo para devolver el array de productos
    listarProductos(){
        try {
            return this.lista
        } catch (error) {
            return [];
        }
    }

    //Metodo para devolver el array del carrito
    listarProductosCarrito(){
        try {
            return this.lista
        } catch (error) {
            return [];
        }
    }

    
}

module.exports = Contenedor