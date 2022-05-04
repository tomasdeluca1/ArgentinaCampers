const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/productsController')


router.get('/product-detail', productController.productDetail)
router.get('/product-creation', productController.productCreation)
router.get('/product-edit', productController.productEdit)

module.exports = router; 