const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/productsController')


router.get('/products', productController.productDetail)
router.get('/products/create', productController.productCreation)
router.get('/products/edit', productController.productEdit)

module.exports = router; 