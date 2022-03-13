const mongoose = require('mongoose')
const urlConfig = require('../utils/config')

const URL = urlConfig.mongodb.url

mongoose.connect(URL)


    class ContenedorMongo {


        constructor (nombreColeccion, esquema) {
           
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