const express = require ('express');
const router = express.Router();
const path = require('path')
const productController = require ('../controllers/productsControllerDB')
const multer = require ('multer')
const validationsCreateProduct = require('../middlewares/validaciones/validationsCreateProduct');
const validationsEditProduct = require('../middlewares/validaciones/validationsEditProduct');
const adminPermissions = require('../middlewares/globalesYruta/adminPermissions');
const getByIdProductMiddleware = require('../middlewares/globalesYruta/getByIdProductMiddleware')
const authMiddleware = require('../middlewares/globalesYruta/authMiddleware');


const enviarAlCarritoValidation = require('../middlewares/validaciones/enviarAlCarritoValidation');





const storage = multer.diskStorage({
    destination: function (req, file, cb){
        let folder = './public/images/imagenesproductos';
        cb(null, folder);
    },
    filename: function(req, file, cb){
        let imageName = 'imgProducto-' + Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    },
    
});




const uploadFile = multer({storage: storage});



router.get('/', productController.productos)
router.get('/create', adminPermissions, productController.createVistas)
router.post('/create', adminPermissions, uploadFile.array('img', 10), validationsCreateProduct, productController.createProduct)
router.get('/:idProducto/edit', adminPermissions, adminPermissions, productController.editVistas)
router.put('/:idProducto/edit',  adminPermissions, uploadFile.array('img', 10), validationsEditProduct, productController.editProduct)
router.put('/:idProducto/delete', adminPermissions, productController.delete)


router.get('/:idProducto', getByIdProductMiddleware, productController.getProductById)

//Enviar productos al carrito
router.post('/:idProducto', authMiddleware, enviarAlCarritoValidation, productController.enviarAlCarrito)






module.exports = router; 



// function cantidadDias (fecha1, fecha2) {
//     if(!(fecha1 instanceof Date) || !(fecha2 instanceof Date)) {
//         throw TypeError('puto')
//     }

//     let diferencia =  (fecha2.getTime() - fecha1.getTime()) / 1000;
//     diferencia /= (60 * 60 * 24)

//     return Math.abs(Math.round(diferencia))
// }

// console.log(cantidadDias(new Date(2002,01,07), new Date(2002,01,09)));


const db = require('../database/models');


// db.Users.findByPk(1, {
//     include: [{association: 'carrito', include: [{association: 'producto', include: [{association: 'imagenes'}]}]}]
// })
// .then(data => {
//     let hola = data.carrito
//     for (let producto of hola) {
//         console.log(producto.dataValues.fechaLlegada);
//     }
// })




