'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = Schema({
    titulo: String,
    descripcion: String,
    year: String,
    portada: String,
    artista: {type: Schema.ObjectId, ref: 'artista'}
});

module.exports = mongoose.model('album',AlbumSchema);