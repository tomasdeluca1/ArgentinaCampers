const express = require ('express');
const router = express.Router();
const path = require('path')
const productController = require ('../controllers/apis/productsControllerDB')
const multer = require ('multer')
const validationsCreateProduct = require('../middlewares/validationsCreateProduct');
const validationsEditProduct = require('../middlewares/validationsEditProduct');
const adminPermissions = require('../middlewares/adminPermissions');




const storage = multer.diskStorage({
    destination: function (req, file, cb){
        let folder = './public/images/imagenesproductos';
        cb(null, folder);
    },
    filename: function(req, file, cb){
        let imageName = 'imgProducto-' + Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
});


const uploadFile = multer({storage: storage});



router.get('/', productController.productos)
router.get('/create', adminPermissions, productController.createVistas)
router.post('/create', adminPermissions, uploadFile.single('img'), validationsCreateProduct, productController.createProduct)
router.get('/:idProducto', productController.getProductById)
router.get('/:idProducto/edit', adminPermissions, adminPermissions, productController.editVistas)
router.put('/:idProducto/edit', adminPermissions, uploadFile.single('img'), validationsEditProduct, productController.editProduct)
router.put('/:idProducto/delete', adminPermissions, productController.delete)









module.exports = router; 