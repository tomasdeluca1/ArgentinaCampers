const todosLosProductos = require("../database/productosDetalle.json")

const controller = {
    productCart: function(req, res){
        res.render('./productCart/productCart', {infoProductos : todosLosProductos})
    },
}



module.exports = controller;