const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/mainController')

router.get('/home', mainController.index)
router.get('/productDetail', mainController.productDetail)
router.get('/productCart', mainController.productCart)
router.get('/login', mainController.login)
router.get('/register', mainController.register)



module.exports = router; 