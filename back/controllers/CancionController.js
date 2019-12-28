'use strict'

var Cancion = require('../models/cancion');
var Albums = require('../models/album');
var path = require('path');

function get_cancion(req,res){
    var id = req.params.id;
    Cancion.findById(id,function(err,cancion){
        if(err){
            res.status(500).send({message:"Error en el servidor"});
        }
        else{
            if(cancion){
                res.status(200).send({
                    cancion:cancion
                });
            }
            else{
                res.status(200).send({message:"La cancion no existe"});
            }
        }
    });
}

function get_canciones(req,res){
    var nombre = req.params.nombre;
    Cancion.find({nombre:new RegExp(nombre, 'i')}).populate('album').exec((err,cancion)=>{
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

    /*Cancion.find({nombre:new RegExp(nombre, 'i')}, function(err, canciones) {
    	Albums.populate(canciones, {path: "album"},function(err, canciones){
        	res.status(200).send({canciones:canciones});
        }); 
    });*/
}

function create_cancion(req,res){
    console.log(req);
    var params = req.body;
    var cancion = new Cancion();
    
    if(req.files){
        var imagen_path = req.files.file.path;
        var name = imagen_path.split('\\');
        var img_name = name[2];

        var img_name_exp =  img_name.split('\.');
        var img_extencion = img_name_exp[1];

        if(img_extencion == "mp3"){
            cancion.numero = params.numero;
            cancion.nombre = params.nombre;
            cancion.duracion = params.duracion;
            cancion.file = img_name;
            cancion.album = params.album;

            cancion.save((error, cancion)=>{
                if(!cancion){
                    res.status(200).send({message:"No se guardo la cancion"});
                }else{
                    res.status(200).send({cancion:cancion});
                }
            });
        }else{
            res.status(200).send({message: "Formato de archivo no valido"});
        }
    }else{
        res.status(500).send({message: "No subiste ninguna cancion"});
    }
}


function update_cancion(req,res){
    var params = req.body;
    var id = req.params.id;

    if(req.files){
        var imagen_path = req.files.file.path;
        var name = imagen_path.split('\\');
        var img_name = name[2];

        console.log(img_name);

        var img_name_exp =  img_name.split('\.');
        var img_extencion = img_name_exp[1];

        if(img_extencion == "mp3"){

            Cancion.findByIdAndUpdate(id,{numero:params.numero, duracion:params.duracion,nombre:params.nombre,album:params.album, file:img_name},function(err,cancion){
                if(!err){
                    if(cancion){
                        res.status(200).send({cancion:cancion});
                    }
                    else{
                        res.status(200).send({message:"No se actualizo ningun cancion"});
                    }
                }else{
                    res.status(500).send({message:"error en el servidor"});
                }
            });
        }else{
            res.status(200).send({message: "Formato de archivo no valido"});
        }

    }else{
        Cancion.findByIdAndUpdate(id,{numero:params.numero, duracion:params.duracion,nombre:params.nombre,album:params.album},function(err,cancion){
            if(!err){
                if(cancion){
                    res.status(200).send({cancion:cancion});
                }
                else{
                    res.status(200).send({message:"No se actualizo ningun cancion"});
                }
            }else{
                res.status(500).send({message:"error en el servidor"});
            }
        });
    }

    
}

function delete_cancion(req,res){
    var id = req.params.id;
    var mp3 = req.params.mp3;

    Cancion.findByIdAndRemove(id,function(err,album){
        if(!err){
            if(album){
                fs.unlink('./uploads/cancion/'+mp3, (err) => {
                    if (err) throw err;
                    console.log('Archivo Eliminado Satisfactoriamente');
                  });
                res.status(200).send({mp3:mp3});
            }else{
                res.status(200).send({message:"No se elimino ninguna cancion"}); 
            }
        }else{
            res.status(500).send({message:"error en el servidor"});
        }
    });
}

function get_mp3(req,res){
    var mp3 = req.params.mp3;

    if(mp3 !="null"){
        var path_img = "./uploads/cancion/"+mp3;
        res.status(200).sendFile(path.resolve(path_img));
    }
    else{
        res.status(200).send({message:"Cancion no encontrada"});
    }
}

module.exports = {
    get_cancion,
    get_canciones,
    create_cancion,
    update_cancion,
    delete_cancion,
    get_mp3,
}