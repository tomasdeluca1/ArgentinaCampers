const express = require ('express');
const router = express.Router();
const aboutUsController= require ('../controllers/aboutUsController')
const authMiddleware = require("../middlewares/globalesYruta/authMiddleware")
const reviewValidation = require ('../middlewares/validaciones/reviewValidation')

router.get('/aboutUs', aboutUsController.index)
router.post('/aboutUs', authMiddleware, reviewValidation, aboutUsController.create)







module.exports = router; 