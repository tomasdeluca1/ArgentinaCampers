const todosLosUsers = require("../../usersDetalle.json")
const fs = require('fs')



const controller = {
    login: function(req, res){
        res.render('login')
    },
    register: function(req, res){
        res.render('register',{infoUsers:todosLosUsers})
    },
}

module.exports = controller;