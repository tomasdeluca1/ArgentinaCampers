const express = require ('express');
const router = express.Router();
const path = require('path');
const usersController = require ('../../controllers/apis/usersControllerApi');



//Vistas register
router.get('/register', usersController.register)

//Proceso register
router.post('/register', usersController.registration)



//Vistas del login
router.get('/login', usersController.login)

//Proceso del login
router.post('/login', usersController.loginProcess)


// Vistas del perfil de usuario
router.get('/profile/:id', usersController.profile)

//Vista editar perfil usuario
router.get('/profile/:id/editData', usersController.editProfileData)

//Proceso editar perfil usuario
router.put('/profile/:id/editData', usersController.processEditProfileData)

//Vista editar contraseña usuario
router.get('/profile/:id/editPassword', usersController.editProfilePassword)

//Proceso editar password usuario
router.put('/profile/:id/editPassword', usersController.processEditProfilePassword)

//Vista editar direccion usuario
router.get('/profile/:id/editDireccion', usersController.editProfileDireccion)

//Proceso editar direccion usuario
router.put('/profile/:id/editDireccion', usersController.processEditProfileDireccion)


//Vista eliminar usuario
router.get('/profile/:id/destroyUser', usersController.destroyUser)

//Proceso eliminar usuario
router.put('/profile/:id/destroyUser',  usersController.processDestroyUser)

//Todos los usuarios
router.get('/all-users', usersController.allUsers)

//Buscar usuarios por nombre
router.get('/search', usersController.search)

module.exports = router;