const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/mainController')

router.get('/home', mainController.index)
router.get('/productDetail', mainController.index)
router.get('/rental-cart', mainController.index)
router.get('/login', mainController.index)
router.get('/register', mainController.index)



module.exports = router; 