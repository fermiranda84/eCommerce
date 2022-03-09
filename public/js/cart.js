const socket = io.connect()

socket.on('carrito', carrito => {
    makeTablaCarrito(carrito)
        .then(html => {
            document.getElementById('tablaCarrito').innerHTML = html
        })
})


function makeTablaCarrito(carrito) {
    return fetch('../../plantillas/cardsCarrito.ejs')
        .then(res => res.text())
        .then(plantilla => {
            const template = ejs.compile(plantilla)
            const html = template({carrito})
            return html
        })
}

function eliminarProductoCarrito(productoId, carritoId) {
    return fetch(`../../carrito/${carritoId}/productos/${productoId}`, {method: 'DELETE'})
        .then(res => window.location.href = `/carrito/${carritoId}/productos`)
}
