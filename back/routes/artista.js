'use strict'

var express = require('express');
var articuloController = require('../controllers/ArtistaController');
var auth = require('../middlewares/authenticate');
var multipart = require('connect-multiparty');
var path = multipart({uploadDir: './uploads/artistas'});


var api = express.Router();

api.get('/artista/:id',articuloController.get_artista);
api.get('/artistas/:nombres?',articuloController.get_artistas);
api.post('/artista/create',path,articuloController.create_artista);
api.put('/artista/edit/:id',path,articuloController.update_artista);
api.delete('/artista/:id/:img',articuloController.delete_artista);
api.get('/artista/img/:img',path,articuloController.get_imagen);
api.put('/artista/foto/:id',path,articuloController.update_foto);

module.exports = api;