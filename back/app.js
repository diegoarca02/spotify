'use strict'

var express = require('express');
var bodyparser = require('body-parser');
var user_routes = require('./routes/user');
var articulo_routes = require('./routes/artista');
var album_routes = require('./routes/album');
var cancion_routes = require('./routes/cancion');
var app = express();


app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.use((req,res,next)=>{
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

//CONFIGURAR CABECERAS HTPP

//RUTAS BASE
app.use('/api',user_routes);
app.use('/api',articulo_routes);
app.use('/api',album_routes);
app.use('/api',cancion_routes);

module.exports = app;