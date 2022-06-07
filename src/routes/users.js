const express = require ('express');
const router = express.Router();
const path = require('path');
const usersController = require ('../controllers/usersController');
const multer = require ('multer');
const registerValidations = require ('../middlewares/userValidations');
const loginValidations = require ('../middlewares/userLoginValidations');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        let folder = './public/images/avatarPerfil';
        cb(null, folder);
    },
    filename: function(req, file, cb){
        let imageName = 'imgUser-' + Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
});

const uploadFile = multer({storage: storage});


//Vistas del registro 
router.get('/register', guestMiddleware, usersController.register)

// Proceso del registro
router.post('/register', uploadFile.single('avatar'), registerValidations, usersController.registration)

//Vistas del login
router.get('/login', guestMiddleware, usersController.login)

//Proceso del login
router.post('/login', loginValidations, usersController.loginProcess)

// Vistas del perfil de usuario
router.get('/profile', authMiddleware, usersController.profile)

//Logout
router.get('/logout', usersController.logout)









module.exports = router; 