const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/products')


router.get('/product-detail', productController.productDetail)


module.exports = router; 