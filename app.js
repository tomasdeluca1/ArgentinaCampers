const express = require('express');
const app = express();

app.set('view engine', 'ejs')


app.use(express.static('public'));



//Rutas
const main = require ('./routes/main')


app.use('/', main)



app.listen(5000, ()=>{
    console.log("Server 5000 running");
});