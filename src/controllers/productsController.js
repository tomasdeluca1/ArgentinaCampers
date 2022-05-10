const todosLosProductos = require("../data/productosDetalle.json")
const fs = require('fs')
const req = require("express/lib/request")
const { Console } = require("console")

const controller = {
    productDetail: function(req, res){
        res.render('productDetail', {infoProductos : todosLosProductos})
    },
    productCreation: function(req, res){
        res.render('productCreation')
    },
    create: function (req ,res){   
        let archivoProductosParaElId = fs.readFileSync('productosDetalle.json', {encoding: 'utf-8'});
        let archivoProductosParaElIdJSON = JSON.parse(archivoProductosParaElId);
        let id = 0;
        if(archivoProductosParaElIdJSON.length > 0){
            id = archivoProductosParaElIdJSON.length + 1;
        }
        let producto = {
            id,
            marca: req.body.marcaDelProducto,
            modelo: req.body.modeloDelProducto,
            img: "../images/" + req.body.imagenDelProducto,
            detalle: req.body.descripcionDelProducto,
            capacidad: req.body.capacidadDelProducto,
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
                res.render('productDescription', {mostrarProducto: mostrarProducto})
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
                res.render('productEdit', {producto: producto})
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
            if(idProducto == null || idProducto == 0 || idProducto == undefined){
                res.render('error404')
            } else if (idProducto == productos[i].id){

                var productoModificado = {
                    id: productos[i].id,
                    marca: req.body.marcaDelProducto,
                    modelo: req.body.modeloDelProducto,
                    img: "../images/" + req.body.imagenDelProducto,
                    detalle: req.body.descripcionDelProducto,
                    capacidad: req.body.capacidadDelProducto,
                }
                
                
            }
        } 
        for (let i = 0; i < productos.length; i++){
            if (idProducto == productos[i].id){
                productos[i] = productoModificado;
            }
        }
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