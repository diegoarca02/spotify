'use strict'

var express = require('express');
var albumController = require('../controllers/AlbumController');
var auth = require('../middlewares/authenticate');
var multipart = require('connect-multiparty');
var path = multipart({uploadDir: './uploads/album'});

var api = express.Router();

api.get('/album/:id',albumController.get_album);
api.get('/albumes/:titulo?',albumController.get_albums);
api.post('/album/create',path,albumController.create_album);
api.put('/album/edit/:id',path,albumController.update_album);
api.delete('/album/:id/:img',albumController.delete_album);
api.get('/album/img/:img',path,albumController.get_imagen);

module.exports = api;