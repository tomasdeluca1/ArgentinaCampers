const controller = {
    productDetail: function(req, res){
        res.render('productDetail', {infoProductos : productos})
    },
    productCreation: function(req, res){     
        res.render('productCreation')
    },
    productEdit: function(req, res){
        res.render('productEdit',{infoProducts:productos})
    }
}  
    

const productos = require("../database/productosDetalle.json")

module.exports = controller;