const express = require('express');
const app = express();
const methodOverride = require ('method-override')
const multer = require ('multer')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')


app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}))
app.use(express.json())





//Rutas
const main = require ('./routes/main')
const productCart = require ('./routes/productCart')
const products= require ('./routes/products')
const users = require ('./routes/users')
const aboutUs= require("./routes/aboutUs")

app.use('/', main)
app.use('/', productCart)
app.use('/products', products)
app.use('/', users)
app.use("/aboutUs", aboutUs)


app.listen(5000, ()=>{
    console.log("Server 5000 running");
});