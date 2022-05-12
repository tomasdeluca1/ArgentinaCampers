const express = require ('express');
const path = require('path')
const router = express.Router();
const multer = require ('multer')
const productController = require ('../controllers/productsController')

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



router.get('', productController.productDetail)
router.get('/create', productController.productCreation)
router.post('/create', uploadFile.single('imagenDelProducto'),productController.create)
router.get('/:idProducto', productController.getProductById)
router.get('/:idProducto/edit', productController.edit)
router.put('/:idProducto/edit', uploadFile.single('imagenDelProducto'), productController.edition)
router.delete('/:idProducto/delete', productController.delete)







module.exports = router; 