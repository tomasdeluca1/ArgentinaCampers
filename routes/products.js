const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/productsController')


router.get('/product-detail', productController.productDetail)


module.exports = router; 