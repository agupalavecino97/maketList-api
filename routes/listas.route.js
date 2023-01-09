'use strict'

var express = require('express');
var controller = require('../controllers/listas.controller');
var autentication = require('../middlewares/autentication')

var api = express.Router();

api.get('/', autentication.authorization, controller.obtenerListas);
api.get('/detail/:id?', autentication.authorization, controller.obtenerDetalleLista);
api.post('/', autentication.authorization, controller.guardarLista);
api.put('/:id?', autentication.authorization, controller.actualizarLista);
api.delete('/:id?', autentication.authorization, controller.eliminarLista);

module.exports = api;