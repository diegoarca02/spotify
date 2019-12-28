'use strict'

var Artista = require('../models/artista');
var mongoose_p = require('mongoose-pagination');
var path = require('path');
const multer = require('multer');
const upload = multer();
const fs = require('fs');

function get_artista(req,res){
    var id = req.params.id;
    Artista.findById(id,function(err,artista){
        if(err){
            res.status(500).send({message:"Error en el servidor"});
        }
        else{
            if(artista){
                res.status(200).send({
                    artista:artista
                });
            }
            else{
                res.status(200).send({message:"El artista no existe"});
            }
        }
    });
}

function get_artistas(req,res){
    var nombres = req.params.nombres;
    /*var page = req.params.page || 1;
    console.log(page);
    if(!page){
        page = 1;
    }
    var perPage = 5;*/

   Artista.find({nombres:new RegExp(nombres, 'i')},function(err,artista){
    if(!err){
        if(artista){
            res.status(200).send({
                artistas:artista,
               
            });
        }else{
            res.status(200).send({message:"No existe ningun registro"});
        }
    }else{
        res.status(500).send({message:"error en el servidor"});
    }
   });

    /*Artista.find().skip((perPage * page) - perPage).limit(perPage).exec((err, artista) => {
        Artista.count((err, count) => { 
            if (err) return next(err);
                res.status(200).send({
                artistas:artista,
                current: page,
                pages: Math.ceil(count / perPage),
            });
        });
      });*/
}

function create_artista(req,res){

    console.log(req);

    const params = req.body;
    var artista = new Artista();

    if(req.files){
        var imagen_path = req.files.imagen.path;
        var name = imagen_path.split('\\');
        var img_name = name[2];

        var img_name_exp =  img_name.split('\.');
        var img_extencion = img_name_exp[1];

        if(img_extencion == "png" || img_extencion == "jpg" || img_extencion =="gif"){
            artista.nombres = params.nombres;
            artista.descripcion = params.descripcion;
            artista.imagen = img_name;

            artista.save((error, artista)=>{
                if(!artista){
                    res.status(200).send({message:"No se guardo el artista"});
                }else{
                    res.status(200).send({artista:artista});
                }
            });
        }else{
            res.status(200).send({message: "Formato de archivo no valido"});
        }
    }
    else{
        res.status(500).send({message: "No subiste ninguna imagen"});
    }
    
}


function update_artista(req,res){
    var params = req.body;
    var id = req.params.id;

    console.log(req);
    if(req.body.imagen !="undefined"){
        var imagen_path = req.files.imagen.path;
        var name = imagen_path.split('\\');
        var img_name = name[2];

        var img_name_exp =  img_name.split('\.');
        var img_extencion = img_name_exp[1];

        if(img_extencion == "png" || img_extencion == "jpg" || img_extencion =="gif"){
            Artista.findByIdAndUpdate(id,{nombres: params.nombres, descripcion: params.descripcion, imagen:img_name},function(err,artista){
                if(!err){
                    if(artista){
                        res.status(200).send({artista:artista});
                    }
                    else{
                        res.status(200).send({message:"No se actualizo ningun artista"});
                    }
                }else{
                    res.status(500).send({message:"error en el servidor"});
                }
            });
        }else{
            res.status(200).send({message: "Formato de archivo no valido"});
        }
    }
    else{
        Artista.findByIdAndUpdate(id,{nombres: params.nombres, descripcion: params.descripcion},function(err,artista){
            if(!err){
                if(artista){
                    res.status(200).send({artista:artista});
                }
                else{
                    res.status(200).send({message:"No se actualizo ningun artista"});
                }
            }else{
                res.status(500).send({message:"error en el servidor"});
            }
        });
    }

    
}

function delete_artista(req,res){
    var id = req.params.id;
    var img = req.params.img;

    Artista.findByIdAndRemove(id,function(err,artista){
        if(!err){
            if(artista){
                fs.unlink('./uploads/artistas/'+img, (err) => {
                    if (err) throw err;
                    console.log('Archivo Eliminado Satisfactoriamente');
                  });
                res.status(200).send({artista:artista});
            }else{
                res.status(200).send({message:"No se elimino ningun artista"}); 
            }
        }else{
            res.status(500).send({message:"error en el servidor"});
        }
    });
}

function update_foto(req,res){
    var id = req.params.id;
   

    if(req.files){
        var imagen_path = req.files.imagen.path;
        var name = imagen_path.split('\\');
        var img_name = name[2];

        var img_name_exp =  img_name.split('\.');
        var img_extencion = img_name_exp[1];

        if(img_extencion == "png" || img_extencion == "jpg" || img_extencion =="gif"){
            Artista.findByIdAndUpdate(id,{imagen:img_name},function(err,artista){
                if(artista){
                    res.status(200).send({artista: artista});
                }
                else{
                    res.status(403).send({message: "No se pudo actualizar"});
                }
            });
        }else{
            res.status(200).send({message: "Formato de archivo no valido"});
        }
    }
    else{
        res.status(500).send({message: "No subiste ninguna imagen"});
    }
}

function get_imagen(req,res){
    
    var imagen = req.params.img;
  
    if(imagen !="null"){
        var path_img = "./uploads/artistas/"+imagen;
        res.status(200).sendFile(path.resolve(path_img));
    }
    else{
        var path_img = "./uploads/artistas/default.gif";
        res.status(200).sendFile(path.resolve(path_img));
    }
}

module.exports = {
    get_artista,
    get_artistas,
    create_artista,
    update_artista,
    delete_artista,
    get_imagen,
    update_foto
}