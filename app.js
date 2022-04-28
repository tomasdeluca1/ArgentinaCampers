const express = require('express');
const app = express();

app.set('view engine', 'ejs')


app.use(express.static('public'));



//Rutas
const main = require ('./routes/main')
const productDetail = require ('./routes/productDetail')
const productCart = require ('./routes/productCart')
const login = require ('./routes/login')
const register = require ('./routes/register')

app.use('/', main)
app.use('/', productDetail)
app.use('/', productCart)
app.use('/', login)
app.use('/', register)




app.listen(5000, ()=>{
    console.log("Server 5000 running");
});