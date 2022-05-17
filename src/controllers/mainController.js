const todosLosProductos = require("../database/productosDetalle.json")

const controller = {
    index: function(req, res){
        res.render('index', {infoProductos: todosLosProductos})
    },
    
}



module.exports = controller;