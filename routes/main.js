const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/mainController')

router.get('/home', mainController.index)
router.get('/product-creation', mainController.productCreation)
router.get('/product-edit', mainController.productEdit)





module.exports = router; 