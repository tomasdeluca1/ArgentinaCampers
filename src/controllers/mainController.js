const todosLosProductos = require("../database/productosDetalle.json")

const controller = {
    index: function(req, res){
        res.render('index')
    },
    header: function(req, res){
        res.render('headerr')
    },
    
}





module.exports = controller;