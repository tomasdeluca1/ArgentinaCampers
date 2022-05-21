const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/aboutUsController')

router.get('/aboutUs', aboutUsController.index)






module.exports = router; 