const todosLosProductos = require("../database/productosDetalle.json")
const fs = require('fs')
const multer = require('multer')
const req = require("express/lib/request")
const { Console } = require("console")

const controller = {
    productDetail: function(req, res){
        res.render('./products/productDetail', {infoProductos : todosLosProductos})
    },
    productCreation: function(req, res){
        res.render('./products/productCreation')
    },
    create: function (req ,res, next){   
        let archivoProductosParaElId = fs.readFileSync('productosDetalle.json', {encoding: 'utf-8'});
        let archivoProductosParaElIdJSON = JSON.parse(archivoProductosParaElId);
        let id = 0;
        if(archivoProductosParaElIdJSON.length > 0){
            id = archivoProductosParaElIdJSON.length + 1;
        }
        
        if(req.file){
            let image = req.file.filename

            var producto = {
            id,
            marca: req.body.marcaDelProducto,
            modelo: req.body.modeloDelProducto,
            img: image,
            detalle: req.body.descripcionDelProducto,
            capacidad: req.body.capacidadDelProducto,
        }
        } else if (!req.file){
            const error = new Error('Por favor seleccione un archivo')
            error.httpStatusCode = 400
            return next(error)
        }

        //Guardar la info 
        //Primero: leer que cosas ya habia!

        let archivoProductos = fs.readFileSync('productosDetalle.json', {encoding: 'utf-8'});
        if (archivoProductos == ""){
            productos = []
        } else {
            productos = JSON.parse(archivoProductos)
        };

        productos.push(producto);

        productosJSON = JSON.stringify(productos)  
        
              
        
        fs.writeFileSync('productosDetalle.json', productosJSON);


        res.redirect('/products')
    },
    getProductById: function (req, res){
        let idProducto = req.params.idProducto 

        let idParaMostrarProducto = req.params.idProducto - 1;

        let mostrarProducto = todosLosProductos[idParaMostrarProducto]

        for (let i = 0; i < todosLosProductos.length; i++){
            if(idProducto == null || idProducto == 0 || idProducto == undefined){
                res.render('error404')
            } else if (idProducto == todosLosProductos[i].id){
                res.render('./products/productDescription', {mostrarProducto: mostrarProducto})
            }
        }

    },
    edit: function(req, res){
        let idProducto = req.params.idProducto;

        for (let i = 0; i < todosLosProductos.length; i++){
            if(idProducto == null || idProducto == 0 || idProducto == undefined){
                res.render('error404')
            } else if (idProducto == todosLosProductos[i].id){
                let producto = todosLosProductos[i]
                res.render('./products/productEdit', {producto: producto})
            }
        }             
    },
    edition: function(req, res){
        let idProducto = req.params.idProducto;

        let archivoProductos = fs.readFileSync('productosDetalle.json', {encoding: 'utf-8'});
                
        if (archivoProductos == ""){
            productos = []
        } else {
            productos = JSON.parse(archivoProductos)
        };

        for (let i = 0; i < productos.length; i++){
            if (idProducto == productos[i].id && req.file){
                let image = req.file.filename;
                console.log(image)
                var productoModificado = {
                    id: productos[i].id,
                    marca: req.body.marcaDelProducto,
                    modelo: req.body.modeloDelProducto,
                    img: image,
                    detalle: req.body.descripcionDelProducto,
                    capacidad: req.body.capacidadDelProducto,
                }          
            }
            else if(idProducto == null || idProducto == 0 || idProducto == undefined && !req.file){
                res.render('error404')
            }
        };

        for (let i = 0; i < productos.length; i++){
            if (idProducto == productos[i].id){
                productos[i] = productoModificado;
            }
        };
        productosJSON = JSON.stringify(productos) 
        fs.writeFileSync('productosDetalle.json', productosJSON)
        res.redirect('/products')
        
    },
    delete: function (req, res) {
        let id = req.params.idProducto;

        let archivoProductos = fs.readFileSync('productosDetalle.json', {encoding: 'utf-8'});
                
        if (archivoProductos == ""){
            productos = []
        } else {
            productos = JSON.parse(archivoProductos);
        };

        archivoProductos = productos.filter(numero => numero.id != id);
        console.log(archivoProductos)

        productosJSON = JSON.stringify(archivoProductos);
        fs.writeFileSync('productosDetalle.json', productosJSON);
        res.redirect('/products');
    },
}



module.exports = controller;