const express = require ('express');
const path = require('path')
const router = express.Router();
const usersController = require ('../controllers/usersController')
const multer = require ('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        let folder = './public/images/imagenesUsuarios';
        cb(null, folder);
    },
    filename: function(req, file, cb){
        let imageName = 'imgUser-' + Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
});

const uploadFile = multer({storage: storage});


router.post('/register', uploadFile.single('imagenDelUsuario'),usersController.create)
router.get('/register', usersController.register)
router.get('/:idProducto', usersController.getUserById)
router.get('/login', usersController.login)




module.exports = router; 