const admin = require("firebase-admin");
const urlConfig = require('../utils/config')

const URL = urlConfig.firebase.url

const serviceAccount = require(URL);

try {

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
} catch (error) {
    console.log(error)
} finally {

    console.log('base de datos conectada')

}

const db = admin.firestore()


class ContenedorFirebase {

    constructor (nombreColeccion) {
       
        this.coleccion = db.collection(nombreColeccion)
        
    }



    async ingresarProducto(data) {

        try {
            let doc = this.coleccion.doc()
            const save = await doc.create(data)
            console.log('Producto agregado')
            return save
            
        } catch (error) {
            console.error(error)
        }

    }


    async listarProductos() {
        
        try {
            const snapshot = await this.coleccion.get()
            let docs = snapshot.docs        
            const response = docs.map((doc)=>({
                id: doc.id,
                nombre: doc.data().nombre,
                descripcion: doc.data().descripcion,
                codigo: doc.data().codigo,
                foto: doc.data().foto,
                precio: doc.data().precio,
                stock: doc.data().stock  
            }))

    return response
            
        } catch (error) {
            console.error(error)
        }

    }

    async actualizarProducto(data) {

        try {
            const doc = this.coleccion.doc(`${data.id}`)
            let item = await doc.update({nombre: data.nombre, precio: data.precio, foto: data.foto, descripcion: data.descripcion, stock: data.stock, codigo: data.codigo});
            return item
        } catch (error) {
            console.error(error);
        }

    
    }

    async eliminarProducto(data) {
        
        try {
            const doc = this.coleccion.doc(`${data.id}`)
            let item = await doc.delete()
            return item
        } catch (error) {
            console.error(error);
        }
    
    }



    async listarProductosCarrito() {
        
        try {
            const snapshot = await this.coleccion.get()
            let docs = snapshot.docs        
            const response = docs.map((doc)=>({
                id: doc.id,
                nombre: doc.data().nombre,
                descripcion: doc.data().descripcion,
                codigo: doc.data().codigo,
                foto: doc.data().foto,
                precio: doc.data().precio,
                stock: doc.data().stock  
            }))

            return response
            
        } catch (error) {
            console.error(error)
        }
    }



    async ingresarProductoCarrito(data) {

        try {
            let productoObj = {nombre: data.nombre, precio: data.precio, foto: data.foto, descripcion: data.descripcion, stock: data.stock, codigo: data.codigo, idOriginal: data.id}
            let doc = this.coleccion.doc()
            const save = await doc.create(productoObj)
            console.log('Producto agregado al carrito')
            return save
            
        } catch (error) {
            console.error(error)
        }

    }


    async eliminarProductoCarrito(data) {
        
        try {
            const doc = this.coleccion.doc(`${data.id}`)
            let item = await doc.delete()
            return item
        } catch (error) {
            console.error(error);
        }
    
    
    }


}

module.exports = ContenedorFirebase