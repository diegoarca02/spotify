'use strict'

var User = require('../models/user');
var Album = require('../models/album');
var Cancion = require('../models/cancion');
var Artista = require('../models/artista');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');
const { check,validationResult} = require('express-validator');


function pruebas(req,res){
    res.status(200).send({message: "Controlador de pruebas"});
}

function registro(req,res){
  
    var params = req.body;
    var user = new User(params);
 

    if(params.password){
        bcrypt.hash(params.password,null,null,function(err,hash){
            user.password = hash;
        
            User.findOne({email:params.email},(err,user_email) =>{
                if(user_email){
                    res.status(403).send({message:"El correo ya esta en uso"});
                }else{
                    user.save((error,user_data)=>{
                        if(!error){
                            if(user_data){
                                res.status(200).send({user: user_data});
                            }else{
                                res.status(200).send({error: error});
                            }
                        }
                        else{
                            res.status(200).send({error: error});
                        }
                    });
                }
            });
            
        });
    }else{
        res.status(500).send({message: "Ingrese la contraseña"});
    }
  
}

function login(req,res){
    var params = req.body;
    console.log(params);
    User.findOne({email:params.email},(err,user) => {
        if(err){  
            res.status(500).send({message:"Error en el servidor"});
        }else{
            if(!user){
                res.status(404).send({message:"Usuario no existe"});
            }else{
                console.log(user);
                bcrypt.compare(params.password,user.password,function(err,check){
                    if(check){
                        if(params.gettoken){
                            res.status(200).send({
                                jwt: jwt.createToken(user),
                                user: user
                            });
                        }
                        else{
                            res.status(200).send({message:"No token",jwt: jwt.createToken(user),});
                        }
                    }
                    else{
                        res.status(200).send({message:"Contraseña Incorrecta"});
                    }
                });
            }
        }
    });
}

function update(req,res){
    var params = req.body;
    var id = req.params.id;
    
    User.findByIdAndUpdate(id,params,function(err,user){
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(user){
                res.status(200).send({user: user});
            }
            else{
                res.status(500).send({message: "El usuario no existe"});
            }
        }
    });
}

function update_perfil(req,res){
    var id = req.params.id;

    if(req.files){
        var imagen_path = req.files.imagen.path;
        var name = imagen_path.split('\\');
        var img_name = name[2];

        var img_name_exp =  img_name.split('\.');
        var img_extencion = img_name_exp[1];

        if(img_extencion == "png" || img_extencion == "jpg" || img_extencion =="gif"){
            User.findByIdAndUpdate(id,{imagen:img_name},function(err,user){
                if(user){
                    res.status(200).send({user: user});
                }
                else{
                    res.status(403).send({message: "No se pudo actualizar"});
                }
            });
        }else{
            res.status(200).send({message: "Formato de archivo no valido"});
        }

        console.log(name);
    }
    else{
        res.status(500).send({message: "No subiste ninguna imagen"});
    }
}

function player(req,res){

    var id = req.params.id;
    
   Cancion.findOne({_id:id}).populate({path:'album', populate : {path:'artista'}}).exec((err,cancion)=>{
        if(!err){
            if(cancion){
                res.status(200).send({canciones:cancion});
            }else{
                res.status(200).send({message:"No existe ningun registro"});
            }
        }else{
            res.status(500).send({message:"error en el servidor",error:err});
        }
    });

}

function playerlist(req,res){
    var nombre = req.params.nombre;
    
    Cancion.find({nombre:new RegExp(nombre, 'i')}).populate({path:'album', populate : {path:'artista'}}).exec((err,cancion)=>{
         if(!err){
             if(cancion){
                 res.status(200).send({canciones:cancion});
             }else{
                 res.status(200).send({message:"No existe ningun registro"});
             }
         }else{
             res.status(500).send({message:"error en el servidor",error:err});
         }
     });
}

module.exports = {
    pruebas,
    registro,
    login,
    update,
    update_perfil,
    player,
    playerlist
}