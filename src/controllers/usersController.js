const todosLosUsers = require("../../usersDetalle.json")
const fs = require('fs')
const multer = require('multer')
const req = require("express/lib/request")
const { Console } = require("console")

const controller = {
    login: function(req, res){
        res.render('login')
    },
    register: function(req, res){
        res.render('register',{infoUsers:todosLosUsers})
    },


    create: function (req ,res, next){   
        let archivoUserParaId = fs.readFileSync('usersDetalle.json', {encoding: 'utf-8'});
        let archivoUserParaIdJSON = JSON.parse(archivoUserParaId);
        let id = 0;
        if(archivoUserParaIdJSON.length > 0){
            id = archivoUserParaIdJSON.length + 1;
        }
        
        if(req.file){
            let image = req.file.filename

            var user = {
            Id,
            Nombre: req.body.firstName,
            Apellido: req.body.lastName,
            Email: req.body.email,
            Contraseña: req.body.password,
            Teléfono: req.body.phone,
            Imagen: image
        }
        } else if (!req.file){
            const error = new Error('Por favor seleccione un archivo')
            error.httpStatusCode = 400
            return next(error)
        }


        let archivoUsers = fs.readFileSync('usersDetalle.json', {encoding: 'utf-8'});
        if (archivoUsers == ""){
            users = []
        } else {
            users = JSON.parse(archivoUsers)
        };

        users.push(user);

        usersJSON = JSON.stringify(users)  
        
        fs.writeFileSync('usersDetalle.json', usersJSON);
    
        res.redirect('/home')
    },
    getUserById: function (req, res){
        let idUser = req.params.idUser 

        let idParaMostrarUser = idUser - 1;

        let mostrarUser = todosLosUsers[idParaMostrarUser]

        for (let i = 0; i < todosLosUsers.length; i++){
            if(idUser == null || idUser == 0 || idUser == undefined){
                res.render('error404')
            } else if (idUser == todosLosUsers[i].id){
                res.render('register', {mostrarUser: mostrarUser})
            }
        }

    },}

module.exports = controller;