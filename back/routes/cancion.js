'use strict'

var express = require('express');
var cancionController = require('../controllers/CancionController');
var auth = require('../middlewares/authenticate');
var multipart = require('connect-multiparty');
var path = multipart({uploadDir: './uploads/cancion'});

var api = express.Router();

api.get('/cancion/:id',cancionController.get_cancion);
api.get('/canciones',cancionController.get_canciones);
api.get('/canciones/:nombre?',cancionController.get_canciones);
api.post('/cancion/create',path,cancionController.create_cancion);
api.put('/cancion/edit/:id',path,cancionController.update_cancion);
api.delete('/cancion/:id/:mp3',cancionController.delete_cancion);
api.get('/cancion/mp3/:mp3',path,cancionController.get_mp3);

module.exports = api;