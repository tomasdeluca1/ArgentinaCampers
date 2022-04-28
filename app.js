const express = require('express');
const app = express();

app.set('view engine', 'ejs')


app.use(express.static('public'));

app.listen(5000, ()=>{
    console.log("Server 5000 running");
});

//Rutas
const main = require ('./routes/main')

app.use('/', main)


app.get('/product-detail', function(req, res){
    res.sendFile(path.join(__dirname, './views/productDetail.html'));
});

app.get('/rental-cart', function(req, res){
    res.sendFile(path.join(__dirname, './views/productCart.html'));
});

app.get('/register', function(req, res){
    res.sendFile(path.join(__dirname, './views/register.html'));
});

app.get('/login', function(req, res){
    res.sendFile(path.join(__dirname, './views/login.html'));
});

