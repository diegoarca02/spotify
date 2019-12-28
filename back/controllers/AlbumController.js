'use strict'

var Album = require('../models/album');
var path = require('path');
var mongoose_p = require('mongoose-pagination');
const multer = require('multer');
const upload = multer();
const fs = require('fs');

function get_album(req,res){
    var id = req.params.id;
    Album.findById(id,function(err,album){
        if(err){
            res.status(500).send({message:"Error en el servidor"});
        }
        else{
            if(album){
                res.status(200).send({
                    album:album
                });
            }
            else{
                res.status(200).send({message:"El album no existe"});
            }
        }
    });
}

function get_albums(req,res){
    var titulo = req.params.titulo;
    Album.find({titulo:new RegExp(titulo, 'i')}).populate('artista').exec((err,album)=>{
        if(!err){
            if(album){
                res.status(200).send({albumes:album});
            }else{
                res.status(200).send({message:"No existe ningun registro"});
            }
        }else{
            res.status(500).send({message:"error en el servidor"});
        }
    });
    
}

function create_album(req,res){

    console.log(req);
    var params = req.body;
    var album = new Album();
    
    if(req.files){
        var imagen_path = req.files.portada.path;
        var name = imagen_path.split('\\');
        var img_name = name[2];

        var img_name_exp =  img_name.split('\.');
        var img_extencion = img_name_exp[1];

        if(img_extencion == "png" || img_extencion == "jpg" || img_extencion =="gif"){
            album.titulo = params.titulo;
            album.descripcion = params.descripcion;
            album.year = params.year;
            album.portada = img_name;
            album.artista = params.artista;

            album.save((error, album)=>{
                if(!album){
                    res.status(200).send({message:"No se guardo el album"});
                }else{
                    res.status(200).send({album:album});
                }
            });
        }else{
            res.status(200).send({message: "Formato de archivo no valido"});
        }
    }else{
        res.status(500).send({message: "No subiste ninguna imagen"});
    }
}


function update_album(req,res){
    var params = req.body;
    var id = req.params.id;
    console.log(req);

    if(req.body.files){
        var imagen_path = req.files.portada.path;
        var name = imagen_path.split('\\');
        var img_name = name[2];

        var img_name_exp =  img_name.split('\.');
        var img_extencion = img_name_exp[1];

        if(img_extencion == "png" || img_extencion == "jpg" || img_extencion =="gif"){
            Album.findByIdAndUpdate(id,{titulo:params.titulo, descripcion:params.descripcion, year:params.year,artista:params.artista,portada:img_name},function(err,album){
                if(!err){
                    if(album){
                        res.status(200).send({album:album});
                    }
                    else{
                        res.status(200).send({message:"No se actualizo ningun album"});
                    }
                }else{
                    res.status(500).send({message:"error en el servidor"});
                }
            });
        }else{
            res.status(200).send({message: "Formato de archivo no valido"});
        }
    }else{
        Album.findByIdAndUpdate(id,{titulo:params.titulo, descripcion:params.descripcion, year:params.year,artista:params.artista},function(err,album){
            if(!err){
                if(album){
                    res.status(200).send({album:album});
                }
                else{
                    res.status(200).send({message:"No se actualizo ningun album"});
                }
            }else{
                res.status(500).send({message:"error en el servidor",eror:err});
            }
        });
    }

    
}



function delete_album(req,res){
    var id = req.params.id;
    var img = req.params.img;

    Album.findByIdAndRemove(id,function(err,album){
        if(!err){
            if(album){
                fs.unlink('./uploads/album/'+img, (err) => {
                    if (err) throw err;
                    console.log('Archivo Eliminado Satisfactoriamente');
                  });
                res.status(200).send({album:album});
            }else{
                res.status(200).send({message:"No se elimino ningun album"}); 
            }
        }else{
            res.status(500).send({message:"error en el servidor"});
        }
    });
}

function get_imagen(req,res){
    
    var imagen = req.params.img;
  
    if(imagen !="null"){
        var path_img = "./uploads/album/"+imagen;
        res.status(200).sendFile(path.resolve(path_img));
    }
    else{
        var path_img = "./uploads/album/default.gif";
        res.status(200).sendFile(path.resolve(path_img));
    }
}

module.exports = {
    get_album,
    get_albums,
    create_album,
    update_album,
    delete_album,
    get_imagen
}