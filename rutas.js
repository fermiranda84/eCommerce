const express = require('express')
const routerProductos = express.Router();
const routerCarrito = express.Router();
const bodyParser = require('body-parser')
const moduloPersistencia = require('./persistencia')


const app = express();
routerProductos.use(express.json());
routerCarrito.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//seteo la carpeta publica para usar y las vistas para las plantillas dentro
app.use(express.static('public'))
app.set('views', './public/views');
app.set('view engine', 'ejs');

const DAOArchivosProductos = require('./daos/productos/productosMemArchivo.dao')
const DAOArchivosCarrito = require('./daos/carrito/carritoMemArchivo.dao')
const objContenedorProductos = new DAOArchivosProductos()
const objContenedorCarrito = new DAOArchivosCarrito()

//Obtengo los productos y carrito guardados en la clase contenedor
let listaProductos = objContenedorProductos.listarProductos();
let listaCarritos = objContenedorCarrito.listarProductosCarrito();

let administrador = true

//seteo las vistas por defecto para cargar todos los productos y los productos agregado al carrito
app.get('/', (req, res) => {
    res.render('main', { listaProductos });
})

app.get('/archivos', (req, res) => {
    res.render('inicio', { listaProductos });
})

app.get('/mongo', (req, res) => {
    res.render('mongo');
})

app.get('/firebase', (req, res) => {
    res.render('firebase');
})

app.get('/carrito/1/productos', (req, res) => {
    res.render('carrito', { listaCarritos });
})

app.get('/mongo/carrito/1/productos', (req, res) => {
    res.render('carritoMongo')
})

app.get('/firebase/carrito/1/productos', (req, res) => {
    res.render('carritoFirebase')
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
    let carritoId = listaCarritos.find(x => x.id == parseInt(req.params.id))
    console.log(carritoId.productos)
    if(carritoId) {
        res.status(200).json(carritoId.productos)
    }
    else {
        res.status(200).json({error: 'Carrito no encontrado'})
    }
})

routerCarrito.post('/1/productos/:id_prod', (req, res)=>{

    let producto = listaProductos.find(x => x.id == parseInt(req.params.id_prod))
    if(producto) {
        listaCarritos[0].productos.push(producto)
        res.status(200).json({msg: 'Producto Agregado', data: producto})

        moduloPersistencia.persCarrito(listaCarritos)

    }
    else {
        res.status(200).json({error: 'Producto no encontrado'})
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


//Seteo las rutas para usar en los verbos
app.use('/productos', routerProductos);
app.use('/carrito', routerCarrito);

module.exports = app