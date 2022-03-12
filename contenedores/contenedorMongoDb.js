// const ProductosModelo = require('../models/Productos.model');
// const CarritosModelo = require('../models/Carritos.model')
// import ProductosModelo from '../models/Productos.model.js'
// import CarritosModelo from '../models/Carritos.model.js'
const mongoose = require('mongoose');
// import mongoose from 'mongoose';
const urlConfig = require('../utils/config')
// import urlConfig from '../utils/config.js'

const URL = urlConfig.mongodb.url


mongoose.connect(URL)
// .then(async ()=>{

//     console.log('base de datos conectada')


    class ContenedorMongo {


        constructor (nombreColeccion, esquema) {
            // this.listaProductos = [
            //     {timestamp: 1644501352847, nombre: 'Martillo', descripcion: 'Mango ergonómico de fibra de vidrio ultra resistente.', codigo: 'M124', foto: 'https://http2.mlstatic.com/D_NQ_NP_778994-MLA48637163054_122021-O.webp', precio: 1275, stock: 10},
            //     {timestamp: 1644501352847, nombre: 'Pinza Universal', descripcion: 'Pinza Universal 180 mm Mango Soft Touch', codigo: 'M128', foto: 'https://http2.mlstatic.com/D_NQ_NP_850195-MLA45726230545_042021-O.webp', precio: 819, stock: 25},
            // ]
            
            
            this.coleccion = mongoose.model(nombreColeccion, esquema)
    
        }



       

        async ingresarProducto(data) {

            try {
                    const obj = new this.coleccion(data)
                    const save = await obj.save()
                    return save
                
            } catch (error) {
                console.error(error)
            }

        }


        async listarProductos() {
            
            try {
                let productos = await this.coleccion.find({})
                return productos
                
            } catch (error) {
                console.error(error)
            }
        }

        async actualizarProducto(data) {
            
            try {
                let resultado = await this.coleccion.updateOne({_id: data._id}, {$set: {nombre: data.nombre, precio: data.precio, foto: data.foto, descripcion: data.descripcion, stock: data.stock, codigo: data.codigo}})
                console.log(data)
                return resultado
            } catch (error) {
                console.error(`Error: ${error}`);
            } 
        
        }

        async eliminarProducto(data) {
            
            try {
                let resultado = await this.coleccion.deleteOne({_id: data._id})
                return resultado
        
            } catch (error) {
                console.error(`Error: ${error}`)
            }
        
        
        }



        async listarProductosCarrito() {
            
            try {
                let productos = await this.coleccion.find({})
                return productos
                
            } catch (error) {
                console.error(error)
            }
        }



        async ingresarProductoCarrito(data) {

            try {
                    let productoObj = {nombre: data.nombre, precio: data.precio, foto: data.foto, descripcion: data.descripcion, stock: data.stock, codigo: data.codigo, idOriginal: data._id}
                    const obj = new this.coleccion(productoObj)
                    const save = await obj.save()
                    return save
                
            } catch (error) {
                console.error(error)
            }

        }


        async eliminarProductoCarrito(data) {
            
            try {
                let resultado = await this.coleccion.deleteOne({_id: data._id})
                return resultado
        
            } catch (error) {
                console.error(`Error: ${error}`)
            }
        
        
        }


    }


    module.exports = ContenedorMongo

// export default ContenedorMongo;

    
// })
// .catch((err)=>{
//     console.error(err)
// });