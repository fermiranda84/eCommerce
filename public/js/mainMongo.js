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