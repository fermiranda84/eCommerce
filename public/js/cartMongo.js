const socket = io.connect()

socket.on('carritoMongo', carrito => {
    makeTablaCarrito(carrito)
        .then(html => {
            document.getElementById('tablaCarritoMongo').innerHTML = html
        })
})


function makeTablaCarrito(carrito) {
    return fetch('../../../plantillas/cardsCarritoMongo.ejs')
        .then(res => res.text())
        .then(plantilla => {
            const template = ejs.compile(plantilla)
            const html = template({carrito})
            return html
        })
}


function eliminarProductoCarrito(productoId) {
    socket.emit('productoCarritoEliminado', {_id: productoId})
    return 
}