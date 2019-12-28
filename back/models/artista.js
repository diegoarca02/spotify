'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtistaSchema = Schema({
    nombres: String,
    descripcion: String,
    imagen: String,
});

module.exports = mongoose.model('artista',ArtistaSchema);