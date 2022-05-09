const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/productsController')



router.get('', productController.productDetail)
router.get('/create', productController.productCreation)
router.post('/create', productController.create)
router.get('/:idProducto', productController.getProductById)
router.get('/:idProducto/edit', productController.edit)
router.put('/:idProducto/edit', productController.edition)
router.delete('/:idProducto/delete', productController.delete)







module.exports = router; 