const socket = io.connect()


//recibo productos del servidor y cargo la plantilla EJS para mostrarlos con un fetch
socket.on('productos', (productos) => {
    makeTablaProductos(productos)
        .then(html => {
            document.getElementById('tablaProductos').innerHTML = html
        })
})

function makeTablaProductos(productos) {
    return fetch('./plantillas/cardsProductos.ejs')
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

    console.log(nombre.value)
    
    let dataAct = {
        nombre: nombre.value,
        precio: precio.value,
        foto: foto.value,
        descripcion: descripcion.value,
        stock: stock.value,
        codigo: codigo.value
    }

    const formDataJsonString = JSON.stringify(dataAct)

    const fetchOptions = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: formDataJsonString,
	};

    return fetch(`./productos/${productoId}`, fetchOptions)
        .then(res => console.log(res))
}



function eliminarProducto(productoId) {
 
    return fetch(`./productos/${productoId}`, {method: 'DELETE'})
        .then(res => window.location.href = '/archivos')
}



function ingresarProducto() {

    const nombre = document.getElementById('nombreForm')
    const precio = document.getElementById('precioForm')
    const foto = document.getElementById('fotoForm')
    const descripcion = document.getElementById('descripcionForm')
    const stock = document.getElementById('stockForm')
    const codigo = document.getElementById('codigoForm') 
    
    let data = {
        nombre: nombre.value,
        precio: precio.value,
        foto: foto.value,
        descripcion: descripcion.value,
        stock: stock.value,
        codigo: codigo.value
    }


    const formDataJsonString = JSON.stringify(data)

    const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: formDataJsonString,
	};

    return fetch('./productos', fetchOptions)
        .then(res => console.log(res))
}



function agregarAlCarrito(productoId, carritoId) {
    return fetch(`/carrito/${carritoId}/productos/${productoId}`, {method: 'POST'})
        .then(res => {
            let toastLiveExample = document.getElementById(`liveToast${productoId}`)
            new bootstrap.Toast(toastLiveExample).show()
        })
}


