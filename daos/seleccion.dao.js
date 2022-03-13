require('dotenv').config();
const daoProductosArchivos = require('./productos/productosMemArchivo.dao')
const daoProductosMongo = require('./productos/productosMongoDb.dao')
const daoProductosFirebase = require('./productos/productosFirebase.dao')
const daoCarritoArchivos = require('./carrito/carritoMemArchivo.dao')
const daoCarritoMongo = require('./carrito/carritoMongoDb.dao')
const daoCarritoFirebase = require('./carrito/carritoFirebase.dao')

console.log(`Variable de entorno: ${process.env.DB_TYPE}`)

let daoProductos
let daoCarrito

switch (process.env.DB_TYPE) {
    case 'archivos':
        daoProductos = daoProductosArchivos
        daoCarrito = daoCarritoArchivos
      break;
    case 'mongo':
        daoProductos = daoProductosMongo
        daoCarrito = daoCarritoMongo
      break;
    case 'firebase':
        daoProductos = daoProductosFirebase
        daoCarrito = daoCarritoFirebase
      break;
    default:
      daoProductos = daoProductosArchivos
      daoCarrito = daoCarritoArchivos
  }

  module.exports = {
    daoProductos,
    daoCarrito
  }
 



