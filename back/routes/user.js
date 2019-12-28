'use strict'

var express = require('express');
var userController = require('../controllers/UserController');
var auth = require('../middlewares/authenticate');
var multipart = require('connect-multiparty');
var path = multipart({uploadDir: './uploads/perfiles'});


var api = express.Router();

api.get('/prueba',auth.auth,userController.pruebas);
api.post('/registro',userController.registro);
api.post('/login',userController.login);
api.put('/user/editar/:id',userController.update);
api.put('/user/perfil/:id',[auth.auth,path],userController.update_perfil);
api.get('/dataplayer/:id',userController.player);
api.get('/dataplayerlist/:nombre?',userController.playerlist);
module.exports = api;