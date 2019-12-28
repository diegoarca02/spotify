'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    nombre: String,
    apellidos: String,
    email: String,
    password: String,
    role: String,
    imagen: String,
});

module.exports = mongoose.model('User',UserSchema);