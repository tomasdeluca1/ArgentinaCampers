const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/mainController')

router.get('/home', mainController.index)
router.get('/productCreation', mainController.productCreation)
router.get('/productEdit', mainController.productEdit)





module.exports = router; 