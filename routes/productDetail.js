const express = require ('express');
const router = express.Router();
const productDetailController = require ('../controllers/producDetailController')

router.get('/product-detail', productDetailController.productDetail)



module.exports = router; 