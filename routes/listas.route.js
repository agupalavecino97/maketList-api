'use strict'

var express = require('express');
var controller = require('../controllers/listas.controller');

var api = express.Router();

api.get('/obtener-listas', controller.obtenerlistas);
api.post('/guardar-lista', controller.guardarLista);
api.put('/actualizar-lista', controller.actualizarLista);
api.delete('/actualizar-lista', controller.eliminarLista);

module.exports = api;