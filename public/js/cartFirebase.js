const socket = io.connect()

socket.on('carrito', carrito => {
    makeTablaCarrito(carrito)
        .then(html => {
            document.getElementById('tablaCarritoFirebase').innerHTML = html
        })
})


function makeTablaCarrito(carrito) {
    return fetch('../../../plantillas/cardsCarritoFirebase.ejs')
        .then(res => res.text())
        .then(plantilla => {
            const template = ejs.compile(plantilla)
            const html = template({carrito})
            return html
        })
}


function eliminarProductoCarrito(productoId) {
    socket.emit('productoCarritoEliminado', {id: productoId})
    return 
}