const { validationResult } = require ('express-validator')
const bcrypt = require ('bcryptjs')


const User = require ('../../models/users');
const db = require('../../database/models/index.js');
const user = require('../../models/users');

const Op = db.Sequelize.Op

const controller = {
    login: function(req, res) {
        return res.status(200).json('hola')
    },
    register: function(req, res){
        return res.status(200).json('hola')
    },
    registration: function (req, res) {

        function image(){
            let imagen = 'avatarDefault.png'
            if (req.file) {
                return req.file.filename;
            } else {
                return imagen;
            }      
        }; 
        let typeOfUser = User.creatingTypeOFUser(req.body.email);

        let userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,                
            email: req.body.email.toLowerCase(),
            emailRespaldo: req.body.emailRespaldo.toLowerCase(),
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: image(),
            birthday: req.body.birthday,
            dni: parseInt(req.body.dni),
            genero_id: parseInt(req.body.genero_id),
            phoneNumber: req.body.phoneNumber,
            phoneNumberRespaldo: req.body.phoneNumberRespaldo,
            typeOfUser: typeOfUser,
            estadoCuenta: 1,
            direccion: {
                provincia_id: parseInt(req.body.provincia),
                municipio: req.body.municipio,
                ciudad: req.body.ciudad,
                calle: req.body.calle,
                numeroVivienda: parseInt(req.body.numeroVivienda),
                codigoPostal: parseInt(req.body.codigoPostal),
            },
        }

        db.Users.create(userData, {
            include: [{association: 'direccion'}]
        })
        .then(user => {
            return res.status(201).json({
                data: user,
                status: 201,
                created: 'ok'
            })
        })
    },
    loginProcess: function (req, res) {

        let email = req.body.email.toLowerCase()
        let password = req.body.password;
        
        db.Users.findOne({
            where: {
                estadoCuenta: 1,
                email: email,
            }
        })
        .then(function(userToLogin){
            if(userToLogin){
                let verifyingPassword = bcrypt.compareSync(password, userToLogin.password)
                if(verifyingPassword){
                    delete userToLogin.password
                    req.session.userLogged = userToLogin;

                    if(req.body.rememberUser){
                        res.cookie('userEmail', bcrypt.hashSync(email, 10), { maxAge: (1000 * 60) * 2 })
                    }
                    return res.status(200).json({
                        // data: userToLogin,
                        status: 201,
                        logged: 'ok'
                    });
                } else {
                    return res.status(400).json({
                        status: 400,
                        logged: 'no',
                        error: 'Contraseña invalida'
                    });
                }
            } else {
                throw new Error
            }
        })
        .catch(error => {
            if(error){
                res.status(400).json({
                    status: 400,
                    logged: 'no',
                    error: 'Email inexistente'                    
                })
            }
        })
    },
    profile: function (req, res) {
        db.Users.findByPk(req.params.id, {
            where: {
                estadoCuenta: 1
            }
        })
        .then(user => {
            if(user){
                return res.status(200).json({
                    data: user,
                    status: 201,
                    logged: 'ok'
                })
            } else {
               throw new Error
            } 
        })
        .catch(error => {
            if (error) {
                return res.status(200).json({
                    status: 400,
                    error: 'No existes'
                })
            } 
        })
    }, 
    editProfileData: function (req, res) {
        db.Users.findOne({
            where: {
                estadoCuenta: 1,
                id: req.params.id
            }
        })
        .then(user => {
            if (user){
                return res.status(200).json({
                    userName: user.userName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    avatar: user.avatar,
                    status: 200,
                })
            } else {
                throw new Error 
            }
        })
        .catch (error => {
            if (error) {
                return res.status(400).json({
                    status: 400,
                    error: 'No existes' 
                })
            }
        })
    },
    processEditProfileData: function (req, res) {
        // function image(){
        //     if (req.file) {
        //         return req.file.filename;
        //     } 
        // }

        function image(){
            if (req.body.newAvatar) {
                return req.body.newAvatar;
            } 
        }

        let userName = req.body.newUserName;
        let email = req.body.newEmail;
        let phoneNumber = req.body.newPhoneNumber;
        let id = req.params.id;
        
        db.Users.update({
            avatar: image(),
            userName: userName,
            email: email,
            phoneNumber: phoneNumber,
        }, {
            where: {
                estadoCuenta: 1,
                id:id
            }
        })

        db.Users.findOne({
            where: {
                estadoCuenta: 1,
                id: id
            }
        })
        .then(user => {
            if (user){
                res.status(200).json({
                    userName: user.userName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    avatar: user.avatar,
                    status: 200,
                })
            } else {
                throw new Error 
            }
        })
        .catch (error => {
            if (error) {
                return res.status(400).json({
                    status: 400,
                    error: 'No existes' 
                })
            }
        })
    },
    editProfilePassword: function (req, res) {
        db.Users.findOne({
            where: {
                estadoCuenta: 1,
                id: req.params.id
            }
        })
        .then(user => {
            if (user){
                return res.status(200).json({
                    password: user.password,
                    status: 200,
                })
            } else {
                throw new Error 
            }
        })
        .catch (error => {
            if (error) {
                return res.status(400).json({
                    status: 400,
                    error: 'No existes' 
                })
            }
        })
    },
    processEditProfilePassword: function (req, res) {
        let password = req.body.newPassword;
        let id = req.params.id;

        db.Users.update({
            password: bcrypt.hashSync(password, 10),
        }, {
            where: {
                estadoCuenta: 1,
                id:id
            }
        })

        db.Users.findOne({
            where: {
                estadoCuenta: 1,
                id: id
            }
        })
        .then(user => {
            if (user){
                return res.status(200).json({
                    password: user.password,
                    status: 200,
                })
            } else {
                throw new Error 
            }
        })
        .catch (error => {
            if (error) {
                return res.status(400).json({
                    status: 400,
                    error: 'No existes' 
                })
            }
        })
    },
    editProfileDireccion: function (req, res) {
        db.Users.findByPk(id, {
            include: [{association: 'direccion', include: [{association: 'provincia'}]}]
        })
        .then(user => {
            if (user){
                return res.status(200).json({
                    provincia: user.direccion.provincia,
                    municipio: user.direccion.municipio,
                    ciudad: user.direccion.ciudad,
                    calle: user.direccion.calle,
                    numeroVivienda: user.direccion.numeroVivienda,
                    codigoPostal: user.direccion.codigoPostal,
                    status: 200,
                })
            } else {
                throw new Error 
            }
        });
        
    },
    processEditProfileDireccion: function (req, res) {
        let id = req.params.id;

    
        db.Users.findByPk(id, {
            include: [{association: 'direccion', include: [{association: 'provincia'}]}]
        })
        .then (user => {
            return res.status(200).json({
                provincia: user.direccion.provincia,
                municipio: user.direccion.municipio,
                ciudad: user.direccion.ciudad,
                calle: user.direccion.calle,
                numeroVivienda: user.direccion.numeroVivienda,
                codigoPostal: user.direccion.codigoPostal,
                status: 200,
                update: 'ok'
            })
        })
        .catch (error => {
            if (error) {
                return res.status(400).json({
                    status: 400,
                    error: 'No existes' 
                })
            }
        })
        
        

        db.Users.findByPk(id)
        .then (user => {
            if(user){
                db.Direccion.update({
                    provincia_id: parseInt(req.body.newProvincia),
                    municipio: req.body.newMunicipio,
                    ciudad: req.body.newCiudad,
                    calle: req.body.newCalle,
                    numeroVivienda: parseInt(req.body.newNumeroVivienda),
                    codigoPostal: parseInt(req.body.newCodigoPostal),
                }, {
                    where: {
                        id: user.direccion_id
                    }
                })
            } 
        })
    }, 
    destroyUser: function (req, res) {
        db.Users.findOne({
            where: {
                estadoCuenta: 1,
                id: req.params.id
            }
        })
        .then(user => {
            if (user){
                return res.status(200).json({
                    estadoCuenta: user.estadoCuenta,
                    status: 200,
                })
            } else {
                throw new Error 
            }
        })
        .catch (error => {
            if (error) {
                return res.status(400).json({
                    status: 400,
                    error: 'No existes' 
                })
            }
        })
    }, 
    processDestroyUser: function (req, res) {
        let id = req.params.id;

        db.Users.update({
            estadoCuenta: 2
        }, {
            where: {
                id: id
            }
        })

        db.Users.findByPk(id)
        .then(user => {
            if(user) {
                return res.status(200).json({
                    estado_cuenta: user.estadoCuenta,
                    status: 200,
                    msg: 'Cuenta borrada'
               }) 
            }
        })
        .catch(error => {
            if(error) {
                return res.status(400).json({
                    status: 400,
                    error: 'No existes' 
                }) 
            }
        })

        // res.clearCookie('userEmail');
        // req.session.destroy();
        // res.redirect('../../home')
    },
    // logout: function(req, res){
    //     res.clearCookie('userEmail');
    //     req.session.destroy();
    //     return res.redirect('home');
    // },
    allUsers: function(req, res) {

        db.Users.findAll({
            where: {
                estadoCuenta: 1
            },
            limit:5
        })
        .then(users => {
            if(users.length > 0) {
                return res.status(200).json({
                    users: users,
                    status: 200,
                    msg: 'Estos son todos los users vigentes'
                })
            } else {
                throw new Error
            }
        })
        .catch(error => {
            if(error) {
                return res.status(400).json({
                    status: 400,
                    error: 'No hay usuarios registrados' 
                })
            }
        })
    }, 
    search: function(req, res) {
        let loQueBuscoElAdmin = req.query.searchingUsers.toLowerCase().trim().replaceAll('-', '').replaceAll('_', '').replaceAll('.', '').replaceAll(' ', '');

        let coincidences = [];

        db.Users.findAll({
            where:{
                estadoCuenta: 1,
                firstName: {[Op.like]: `%${loQueBuscoElAdmin}%`}
            },
            order: [
                ['id', 'ASC']
            ],
            limit: 5
        })
        .then(function(users){
            if(users.length == 0){
                return res.status(400).json({
                    users: coincidences,
                    status: 400,
                    msg: 'No se encontraron usuarios que coincidan con tu busqueda'
                })
            } else {
                return res.status(200).json({
                    users: users,
                    status: 200,
                    msg: 'Estos son los usuarios que coinciden con tu busqueda'
                })
            }
        })
    }
}  


module.exports = controller;





// {
//     "firstName" : "Pepe",
//     "lastName": "Isola",
//     "userName": "Pepe Isola",
//     "email": "pepeisola@gmail.com",
//     "emailRespaldo" : "pepeisola2@gmail.com",
//     "password" : "hola123",
//     "avatar" : "avatarDefault.png",
//     "birthday": "2003-11-25",
//     "dni" : "12345678",
//     "genero_id": 2,
//      "phoneNumber" : "1234567891111",
//      "phoneNumberRespaldo" : "1234567891121",
//      "provincia": 1,
//      "municipio": "La matanza",
//      "ciudad": "Evita",
//      "calle": "Messi",
//      "numeroVivienda": 13,
//      "codigoPostal": 1778
// }




           

        