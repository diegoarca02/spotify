'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 4201;

mongoose.connect('mongodb://localhost:27017/spotify',{useUnifiedTopology: true, useNewUrlParser: true}, (err,res)=>{
    if(err){
        throw err;
    }else{
        console.log("Corriendo....");

        app.listen(port, function(){
            console.log("Servidor " + port );
        });
    }
});