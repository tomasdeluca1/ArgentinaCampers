const express = require ('express');
const router = express.Router();
const productCartController = require ('../controllers/productCartController')


router.get('/rental-cart', productCartController.productCart)


module.exports = router; 