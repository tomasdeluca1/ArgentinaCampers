const controller = {
    productDetail: function(req, res){
        res.render('productDetail', {infoProductos : productos})
    },
}  
    

const productos = require("../database/productosDetalle.json")

module.exports = controller;