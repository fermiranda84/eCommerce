const socket = io.connect()


//recibo productos del servidor y cargo la plantilla EJS para mostrarlos con un fetch
socket.on('productos', (productos) => {
    makeTablaProductosFirebase(productos)
        .then(html => {
            document.getElementById('tablaProductosFirebase').innerHTML = html
        })
})

function makeTablaProductosFirebase(productos) {
    return fetch('./plantillas/cardsProductosFirebase.ejs')
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

    socket.emit('productoActualizadoFirebase', {id: productoId, nombre: nombre.value, precio: precio.value, foto: foto.value, descripcion: descripcion.value, stock: stock.value, codigo: codigo.value})
    
    return

}

function eliminarProducto(productoId) {

    socket.emit('productoEliminadoFirebase', {id: productoId})
    
    return false

}


function ingresarProducto() {

    const nombre = document.getElementById('nombreForm')
    const precio = document.getElementById('precioForm')
    const foto = document.getElementById('fotoForm')
    const descripcion = document.getElementById('descripcionForm')
    const stock = document.getElementById('stockForm')
    const codigo = document.getElementById('codigoForm') 

    socket.emit('productoIngresadoFirebase', {nombre: nombre.value, precio: precio.value, foto: foto.value, descripcion: descripcion.value, stock: stock.value, codigo: codigo.value})
    
    return false

}


function agregarAlCarrito(productoId, productoNombre, productoPrecio, productoFoto, productoDescripcion, productoStock, productoCodigo) {
    socket.emit('productoCarritoAgregadoFirebase', {id: productoId, nombre: productoNombre, precio: productoPrecio, foto: productoFoto, descripcion: productoDescripcion, stock: productoStock, codigo: productoCodigo})
    let toastLiveExample = document.getElementById(`liveToast${productoId}`)
    new bootstrap.Toast(toastLiveExample).show()
    return 
}