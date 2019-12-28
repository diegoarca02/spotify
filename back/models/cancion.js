'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CancionSchema = Schema({
    numero: String,
    nombre: String,
    duracion: String,
    file: String,
    album: {type: Schema.ObjectId, ref: 'album'}
});

module.exports = mongoose.model('cancion',CancionSchema);