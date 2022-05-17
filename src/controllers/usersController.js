const todosLosProductos = require("../database/productosDetalle.json")

const controller = {
    login: function(req, res){
        res.render('./users/login', {infoProductos : todosLosProductos})
    },
    register: function(req, res){
        res.render('./users/register', {infoProductos : todosLosProductos})
    },
}

module.exports = controller;