const express = require ('express');
const router = express.Router();
const productCartController = require ('../controllers/productCartController');
const productController = require ('../controllers/productCartController')
const authMiddleware = require('../middlewares/authMiddleware');
const enviarAlCarritoValidation = require('../middlewares/enviarAlCarritoValidation')


router.get('/rental-cart', authMiddleware, productCartController.productCart)

//Ruta eliminar producto del carrito

router.delete('/destroyProduct', productCartController.eliminarProductoDelCarrito)

module.exports = router; 