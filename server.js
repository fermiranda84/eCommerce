const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')
const routerProductos = express.Router();
const routerCarrito = express.Router();
const bodyParser = require('body-parser')
const moduloPersistencia = require('./persistencia')

// const ProductosDAOMongo = require('./daos/productos/productosMongoDb.dao')
// const objContenedorMongoDbProductos = new ProductosDAOMongo()

// const CarritoDAOMongo = require('./daos/carrito/carritoMongoDb.dao')
// const objContenedorMongoDBCarrito = new CarritoDAOMongo()

// const ContenedorProductos = require('./daos/productos/productosMemArchivo.dao')
// const objContenedorProductos = new ContenedorProductos
// const ContenedorCarrito = require('./daos/carrito/carritoMemArchivo.dao')
// const objContenedorCarrito = new ContenedorCarrito

const DAO = require('./daos/seleccion.dao')
const objContenedorProductos = new DAO.daoProductos()
const objContenedorCarrito = new DAO.daoCarrito()





const app = express();
routerProductos.use(express.json());
routerCarrito.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
// const httpServer = createServer();
// const io = new Server(httpServer)

//seteo la carpeta publica para usar y las vistas para las plantillas dentro
app.use(express.static('public'))
app.set('views', './public/views');
app.set('view engine', 'ejs');

//Obtengo los productos y carrito guardados en la clase contenedor
let listaProductos = objContenedorProductos.listarProductos();
let listaCarritos = objContenedorCarrito.listarProductosCarrito();


//variable para permisos de administrador
let administrador = true

//seteo las vistas por defecto para cargar todos los productos y los productos agregado al carrito
app.get('/', (req, res) => {
    res.render('main', { listaProductos });
})

app.get('/archivos', (req, res) => {
    res.render('inicio', { listaProductos });
})

app.get('/mongo', (req, res) => {
    res.render('mongo', { listaProductosMongo });
})

app.get('/firebase', (req, res) => {
    res.render('firebase', { listaProductos });
})

app.get('/carrito/1/productos', (req, res) => {
    res.render('carrito', { listaCarritos });
})

app.get('/mongo/carrito/1/productos', (req, res) => {
    res.render('carritoMongo', { listaCarritosMongo })
})

//Verbos de distintas acciones de productos
routerProductos.get('/:id', (req, res)=>{
    let productoId = listaProductos.find(x => x.id == parseInt(req.params.id))
    if(productoId) {
        res.status(200).json(productoId)
    }
    else {
        res.status(200).json(listaProductos)
    }
})


routerProductos.post('/', (req, res)=>{

    if(administrador == true) {
        let producto = req.body
        producto.id = listaProductos.length+1
        producto.timestamp = Date.now()
        listaProductos.push(producto);
        res.status(200).json({msg: 'Producto Agregado', data: producto});

       moduloPersistencia.persProductos(listaProductos)

    }
    else { res.status(200).json({error: -1, descripcion: `ruta ${req.path} en el método ${req.method} no autorizada.`}) }
})

routerProductos.put('/:id', (req, res)=>{

    if (administrador == true) {
        let productoId = listaProductos.find(x => x.id == parseInt(req.params.id))
        let productoAct = req.body
        let idProducto = parseInt(productoId.id)
        let listaPosicion = listaProductos[idProducto-1]
        if(productoId) {
            listaPosicion.nombre = productoAct.nombre
            listaPosicion.precio = productoAct.precio
            listaPosicion.descripcion = productoAct.descripcion
            listaPosicion.codigo = productoAct.codigo
            listaPosicion.foto = productoAct.foto
            listaPosicion.stock = productoAct.stock
            res.status(200).json({msg: 'Producto Actualizado', data: productoId})

            moduloPersistencia.persProductos(listaProductos)
            

        }
        else {
            res.status(200).json({error: 'Producto no encontrado'})
        }  

    }
    else { res.status(200).json({error: -1, descripcion: `ruta ${req.path} en el método ${req.method} no autorizada.`}) }

})


routerProductos.delete('/:id', (req, res)=>{

    if(administrador == true) {
        let productoId = listaProductos.find(x => x.id == parseInt(req.params.id))

        if(productoId) {
            listaProductos.splice(productoId.id-1, 1)
            res.status(200).json({msg: 'Producto Borrado', nuevaData: listaProductos})
        }
        else {
            res.status(200).json({error: 'Producto no encontrado'})
        }
    }
    else { res.status(200).json({error: -1, descripcion: `ruta ${req.path} en el método ${req.method} no autorizada.`}) }

})


//Verbos de distintas accinoes del carrito
routerCarrito.post('/', (req, res)=>{
    let carrito = {id: listaCarritos.length+1, timestamp: Date.now(), productos: []}
    listaCarritos.push(carrito);
    res.status(200).json({msg: 'Carrito Agregado', data: carrito});

    moduloPersistencia.persCarrito(listaCarritos)

})


routerCarrito.delete('/:id', (req, res)=>{
    let carritoId = listaCarritos.find(x => x.id == req.params.id)
    if(carritoId) {
        let indexCarrito = listaCarritos.indexOf(carritoId)
        listaCarritos.splice(indexCarrito, 1)
        res.status(200).json({msg: 'Carrito Borrado', nuevaData: listaCarritos})
    }
    else {
        res.status(200).json({error: 'Carrito no encontrado'})
    }
})


routerCarrito.get('/:id/productos', (req, res)=>{
    let carritoId = listaCarritos.find(x => x.id == req.params.id)
    if(carritoId) {
        res.status(200).json(carritoId.productos)
    }
    else {
        res.status(200).json({error: 'Carrito no encontrado'})
    }
})

routerCarrito.post('/:id/productos/:id_prod', (req, res)=>{

    let carritoId = listaCarritos.find(x => x.id == parseInt(req.params.id))
    if(carritoId) {
        let producto = listaProductos.find(x => x.id == parseInt(req.params.id_prod))
        carritoId.productos.push(producto);
        res.status(200).json({msg: 'Producto Agregado', data: producto})

        moduloPersistencia.persCarrito(listaCarritos)

    }
    else {
        res.status(200).json({error: 'Carrito no encontrado'})
    }

  
})

routerCarrito.delete('/:id/productos/:id_prod', (req, res)=>{
    let carritoId = listaCarritos.find(x => x.id == parseInt(req.params.id))
    if(carritoId) {
        let producto = carritoId.productos.find(x => x.id == parseInt(req.params.id_prod))
        let indexProducto = carritoId.productos.indexOf(producto)
        let indexCarrito = listaCarritos.indexOf(carritoId)
        listaCarritos[indexCarrito].productos.splice(indexProducto, 1)
        res.status(200).json({msg: 'Producto Borrado', nuevaData: carritoId.productos})
    }
    else {
        res.status(200).json({error: 'Carrito no encontrado'})
    }
})



//Seteo los errores para mostrar en caso de acceder a una ruta que no esta manejada
routerCarrito.get('*', (req, res) => {
    res.status(404).json(
        {error: -2, descripcion: `ruta ${req.path} en el método ${req.method} no implementada.`}
    )
})

routerProductos.get('*', (req, res) => {
    res.status(404).json(
        {error: -2, descripcion: `ruta ${req.path} en el método ${req.method} no implementada.`}
    )
})


let listaProductosMongo
let listaCarritosMongo
const obtenerProductos = async () => {

    listaProductosMongo = await objContenedorProductos.listarProductos()
    listaCarritosMongo = await objContenedorCarrito.listarProductosCarrito()
    //Armo un objeto con las listas y la clave adminitrador para enviar al frontend
    let objetosProductos = {
        claveProductos: listaProductos,
        claveCarritos: listaCarritos,
        claveProductosMongo: listaProductosMongo,
        claveCarritosMongo: listaCarritosMongo,
        claveAdm: administrador
    }
    
    io.on('connection', socket => {
        console.log(`Nuevo usuario conectado ${socket.id}`)
    
        socket.emit('productos', objetosProductos)
        socket.emit('carrito', listaCarritos)
        socket.emit('carritoMongo', listaCarritosMongo)



        socket.on('productoActualizado', data =>{
        
            //creo la tabla en la base de datos de productos
            objContenedorProductos.actualizarProducto(data)
                .then(()=>{
                    console.log("Producto actualizado en mongoDB");
                })
                
                .finally(async (res)=>{
                    let listaProductosActualizados = await objContenedorProductos.listarProductos()
                    objetosProductos.claveProductosMongo = listaProductosActualizados
                    io.sockets.emit('productos', objetosProductos)
                })
                
        })

        socket.on('productoEliminado', data =>{
        
            //creo la tabla en la base de datos de productos
            objContenedorProductos.eliminarProducto(data)
                .then(()=>{
                    console.log("Producto eliminado en mongoDB");
                })
                
                .finally(async (res)=>{
                    let listaProductosActualizados = await objContenedorProductos.listarProductos()
                    objetosProductos.claveProductosMongo = listaProductosActualizados
                    io.sockets.emit('productos', objetosProductos);
                })
                
        })


        socket.on('productoIngresado', data =>{
        
            //creo la tabla en la base de datos de productos
            objContenedorProductos.ingresarProducto(data)
                .then(()=>{
                    console.log("Producto ingresado en mongoDB");
                })
                
                .finally(async (res)=>{
                    let listaProductosActualizados = await objContenedorProductos.listarProductos()
                    objetosProductos.claveProductosMongo = listaProductosActualizados
                    io.sockets.emit('productos', objetosProductos);
                })
                
        })

        socket.on('productoCarritoAgregado', data =>{
        
            //creo la tabla en la base de datos de productos
            objContenedorCarrito.ingresarProductoCarrito(data)
                .then(()=>{
                    console.log("Producto agregado al carrito en mongoDB");
                })

                .finally(async (res)=>{
                    listaCarritosMongo = await objContenedorCarrito.listarProductosCarrito()
                    socket.emit('carritoMongo', listaCarritosMongo)
                })
                
        })


        socket.on('productoCarritoEliminado', data =>{
        
            //creo la tabla en la base de datos de productos
            objContenedorCarrito.eliminarProductoCarrito(data)
                .then(()=>{
                    console.log("Producto eliminado del carrito en mongoDB");
                })
                
                .finally(async (res)=>{
                    listaCarritosMongo = await objContenedorCarrito.listarProductosCarrito()
                    socket.emit('carritoMongo', listaCarritosMongo)
                })
                
        })


        
    })



}

obtenerProductos()



//Seteo las rutas para usar en los verbos
app.use('/productos', routerProductos);
app.use('/carrito', routerCarrito);

const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

// const PORT = 8080;
// const server = app.listen(PORT, () => {
//     console.log(`Servidor escuchando en el puerto ${PORT}`)
// });

server.on('error', error => console.log(`Error en servidor ${error}`))
