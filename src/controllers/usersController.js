const express = require('express')
const path = require ('path')
const fs = require('fs')
const req = require("express/lib/request")
const { Console } = require("console")
const { use } = require('express/lib/application')


const json = __dirname + '/../database/usersDetalle.json';

const controller = {
    login: function(req, res){
        res.render('./users/login')
    },
    register: function(req, res){
        res.render('./users/register')
    },
    registration: function(req, res){
        let userId = fs.readFileSync(json, {encoding: 'utf-8'});
        let userIdParse = JSON.parse(userId)
        let id = 0;
        if (userIdParse.length > 0){
            id = userIdParse.length + 1;
        }
        
    
        // Guardar la info

        let archivoUsers = fs.readFileSync(json, {encoding: 'utf-8'});
        if(archivoUsers == ""){
            users = []
        } else {
            users = JSON.parse(archivoUsers)
        }

        let mailInLowerCase = req.body.email.toLowerCase();
        function email (email = mailInLowerCase){
            var acumulador = 0;
            for (let user of users){
                if(user.email == email){
                    return acumulador = acumulador + 1;
                }
            }
            return acumulador;
        };

        
        if (email() == 0 && req.body.password === req.body.password2){
            var user = {
                id,
                name: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email.toLowerCase(),
                password: req.body.password,
                password2: req.body.password2,
                avatar: req.body.avatar,
                phoneNumber: req.body.phoneNumber,
            }
            users.push(user);
            usersJSON = JSON.stringify(users);
            fs.writeFileSync(json, usersJSON);
            res.redirect('/home')

        }else if (email() > 0){
            res.send('puto, pone bien las cosas')
        }
    },
    loggearse: function (req, res){
        let users = require ('../database/usersDetalle.json')
        let acumulador = 0;

        function login (){
            for (const user of users) {
                if(req.body.email.toLowerCase() == user.email && req.body.password == user.password){
                    acumulador = acumulador + 1;
                }
            }
            return acumulador
        } 
        console.log(login());
        if(login() > 0){
            res.redirect('/home')
        } else if (login() == 0){
            res.send('Puto')
        }
    }
}











module.exports = controller;