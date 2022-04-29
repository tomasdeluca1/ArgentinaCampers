const express = require('express');
const app = express();

app.set('view engine', 'ejs')


app.use(express.static('public'));



//Rutas
const main = require ('./routes/main')
const productCart = require ('./routes/productCart')
const products= require ('./routes/products')
const users = require ('./routes/users')


app.use('/', main)
app.use('/', productCart)
app.use('/', products)
app.use('/', users)



app.listen(5000, ()=>{
    console.log("Server 5000 running");
});