const express = require ('express');
const router = express.Router();
const aboutUsController= require ('../controllers/aboutUsController')
const authMiddleware = require("../middlewares/authMiddleware")
const reviewValidation = require ('../middlewares/reviewValidation')

router.get('/aboutUs', aboutUsController.index)
router.post('/aboutUs', authMiddleware, reviewValidation, aboutUsController.create)







module.exports = router; 