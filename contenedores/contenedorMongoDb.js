const ProductosModelo = require('../models/Productos.model');
const mongoose = require('mongoose');

const URL = 'mongodb+srv://coderhouse:coderhouse@cluster0.z6imv.mongodb.net/ecommerce?retryWrites=true&w=majority';

mongoose.connect(URL)

// .then(async ()=>{

//     console.log('base de datos conectada')

    class ContenedorMongo {


        constructor () {
            this.listaProductos = [
                {timestamp: 1644501352847, nombre: 'Martillo', descripcion: 'Mango ergonómico de fibra de vidrio ultra resistente.', codigo: 'M124', foto: 'https://http2.mlstatic.com/D_NQ_NP_778994-MLA48637163054_122021-O.webp', precio: 1275, stock: 10},
                {timestamp: 1644501352847, nombre: 'Pinza Universal', descripcion: 'Pinza Universal 180 mm Mango Soft Touch', codigo: 'M128', foto: 'https://http2.mlstatic.com/D_NQ_NP_850195-MLA45726230545_042021-O.webp', precio: 819, stock: 25},
            ]
        }



        async insertarProductos() {

            try {

                for (const producto of this.listaProductos) {
                    const obj = new ProductosModelo(producto)
                    const save = await obj.save()
                    return save
                }
                
            } catch (error) {
                console.error(error)
            }

        }


        async listarProductos() {
            
            try {
                let productos = await ProductosModelo.find({})
                // console.log(productos)
                
                return productos
                
            } catch (error) {
                console.error(error)
            }
        }


    }

    module.exports = ContenedorMongo
    
// })
// .catch((err)=>{
//     console.error(err)
// });
