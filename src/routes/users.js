const express = require ('express');
const path = require('path')
const router = express.Router();
const usersController = require ('../controllers/usersController')
const multer = require ('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        let folder = './public/images/avatares';
        cb(null, folder);
    },
    filename: function(req, file, cb){
        let imageName = 'imgUser-' + Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
});

const uploadFile = multer({storage: storage});



router.get('/register', usersController.register)
router.post('/register', usersController.registration)
router.get('/login', usersController.login)
router.post('/login', usersController.loggearse)







module.exports = router; 