'use strict'

var express = require('express');
var controller = require('../controllers/usuarios.controller');

var api = express.Router();

api.post('/login', controller.login);
api.post('/registro', controller.registro);

module.exports = api;