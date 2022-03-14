const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')
const rutas = require('./rutas'); 
const DAO = require('./daos/seleccion.dao')
const objContenedorProductos = new DAO.daoProductos()
const objContenedorCarrito = new DAO.daoCarrito()
const app = express();
app.use('/', rutas);
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer)


//variable para permisos de administrador
let administrador = true

let listaProductos
let listaCarritos

const obtenerProductos = async () => {
    
    //Obtengo los productos y carrito guardados en la clase contenedor
    listaProductos = await objContenedorProductos.listarProductos()
    listaCarritos = await objContenedorCarrito.listarProductosCarrito()

    //Armo un objeto con las listas y la clave adminitrador para enviar al frontend
    let objetosProductos = {
        claveProductos: listaProductos,
        claveCarritos: listaCarritos,
        claveAdm: administrador
    }

    
    
    io.on('connection', socket => {
        console.log(`Nuevo usuario conectado ${socket.id}`)
    
        socket.emit('productos', objetosProductos)
        socket.emit('carrito', listaCarritos)


        socket.on('productoActualizado', data =>{
        
            //creo la tabla en la base de datos de productos
            objContenedorProductos.actualizarProducto(data)
                .then(()=>{
                    console.log("Producto actualizado");
                })
                
                .finally(async (res)=>{
                    let listaProductosActualizados = await objContenedorProductos.listarProductos()
                    objetosProductos.claveProductos = listaProductosActualizados
                    io.sockets.emit('productos', objetosProductos)
                })
                
        })

        
        socket.on('productoEliminado', data =>{
        
            //creo la tabla en la base de datos de productos
            objContenedorProductos.eliminarProducto(data)
                .then(()=>{
                    console.log("Producto eliminado");
                })
                
                .finally(async (res)=>{
                    let listaProductosActualizados = await objContenedorProductos.listarProductos()
                    objetosProductos.claveProductos = listaProductosActualizados
                    io.sockets.emit('productos', objetosProductos);
                })
                
        })

        
        socket.on('productoIngresado', data =>{
        
            //creo la tabla en la base de datos de productos
            objContenedorProductos.ingresarProducto(data)
                .then(()=>{
                    console.log("Producto ingresado");
                })
                
                .finally(async (res)=>{
                    let listaProductosActualizados = await objContenedorProductos.listarProductos()
                    objetosProductos.claveProductos = listaProductosActualizados
                    io.sockets.emit('productos', objetosProductos);
                })
                
        })

        
        socket.on('productoCarritoAgregado', data =>{
        
            //creo la tabla en la base de datos de productos
            objContenedorCarrito.ingresarProductoCarrito(data)
                .then(()=>{
                    console.log("Producto agregado al carrito");
                })

                .finally(async (res)=>{
                    listaCarritos = await objContenedorCarrito.listarProductosCarrito()
                    socket.emit('carrito', listaCarritos)
                })
                
        })

        socket.on('productoCarritoEliminado', data =>{
        
            //creo la tabla en la base de datos de productos
            objContenedorCarrito.eliminarProductoCarrito(data)
                .then(()=>{
                    console.log("Producto eliminado del carrito");
                })
                
                .finally(async (res)=>{
                    listaCarritos = await objContenedorCarrito.listarProductosCarrito()
                    socket.emit('carrito', listaCarritos)
                })
                
        })

 
    })

}

obtenerProductos()

const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

server.on('error', error => console.log(`Error en servidor ${error}`))