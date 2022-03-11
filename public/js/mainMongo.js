const socket = io.connect()


//recibo productos del servidor y cargo la plantilla EJS para mostrarlos con un fetch
socket.on('productos', (productos) => {
    makeTablaProductosMongo(productos)
        .then(html => {
            document.getElementById('tablaProductosMongo').innerHTML = html
        })
})

function makeTablaProductosMongo(productos) {
    return fetch('./plantillas/cardsProductosMongo.ejs')
        .then(res => res.text())
        .then(plantilla => {
            const template = ejs.compile(plantilla)
            const html = template({productos})
            return html
        })
}


function actualizarProducto(productoId) {

    const nombre = document.getElementById(`nombre${productoId}`)
    const precio = document.getElementById(`precio${productoId}`)
    const foto = document.getElementById(`foto${productoId}`)
    const descripcion = document.getElementById(`descripcion${productoId}`)
    const stock = document.getElementById(`stock${productoId}`)
    const codigo = document.getElementById(`codigo${productoId}`) 

    socket.emit('productoActualizado', {_id: productoId, nombre: nombre.value, precio: precio.value, foto: foto.value, descripcion: descripcion.value, stock: stock.value, codigo: codigo.value})
    
    return

}

function eliminarProducto(productoId) {

    socket.emit('productoEliminado', {_id: productoId})
    
    return false

}


function ingresarProducto() {

    const nombre = document.getElementById('nombreForm')
    const precio = document.getElementById('precioForm')
    const foto = document.getElementById('fotoForm')
    const descripcion = document.getElementById('descripcionForm')
    const stock = document.getElementById('stockForm')
    const codigo = document.getElementById('codigoForm') 

    socket.emit('productoIngresado', {nombre: nombre.value, precio: precio.value, foto: foto.value, descripcion: descripcion.value, stock: stock.value, codigo: codigo.value})
    
    return false

}


function agregarAlCarrito(productoId) {
    socket.emit('productoCarritoAgregado', {_id: productoId})
    let toastLiveExample = document.getElementById(`liveToast${productoId}`)
    new bootstrap.Toast(toastLiveExample).show()
    return 
}