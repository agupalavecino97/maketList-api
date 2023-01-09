'use strict'

//modelos
let model = require('../models/listas.model');


function obtenerListas(req, res) {
    model.obtenerListas(req.id_usuario, function (error, response) {
        if (error) {
            res.status(500).send({ error: error });
        } else {
            if (response.error) {
                res.status(200).send({ error: response.error });
            } else {
                res.status(200).send({ data: response.data });
            }
        }
    });
}


function guardarLista(req, res) {
    let params = req.body; 
    let date = new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    let data = {
            id: null,
            nombre: params.lista.nombre,
            precio: params.lista.precio,
            estado: params.lista.estado,
            fecha: date,
            id_usuario: req.id_usuario,
            eliminado: 0
    }
    if (params) {
        model.guardarLista(data, params.items, (error, resultado) => {
            if (error) {
                res.status(500).send({ message: 'Error al Guardar.' });
            } else {
                if (resultado.error) {
                    res.status(200).send({error: resultado.error});
                } else {
                    if (resultado.message) {
                        res.status(200).send({message: resultado.message});
                    } else {
                        res.status(200).send({data: resultado.data});
                    }
                }
            }
        }); 
    } else {
        res.status(403).send({message: 'Error en el controlador, params undefined'} );
    }
}

function actualizarLista(req, res) {
    let id = req.params.id;
    let data = req.body;
    console.log(data)
    if (data) {
        model.actualizarLista(data, id, (error, resultado) => {
            if (error) {
                res.status(500).send({ message: 'Error al actualizar.' });
            } else {
                if (resultado.error) {
                    res.status(200).send({error: resultado.error});
                } else {
                    res.status(200).send({message: resultado.message});
                }
            }
        });
    } else {
        res.status(403).send({message: 'Error en el controlador, params undefined'} );
    }
}

function eliminarLista(req, res) {
    let id = req.params.id;
    if (id) {
        model.eliminarLista(id, (error, resultado)=>{
            if (error) { 
                res.status(500).send({message: "Error al eliminar."});
            } else {
                if (resultado.error) {
                    res.status(200).send({error: resultado.error});
                } else {
                    res.status(200).send({message: resultado.message});
                }
            }
        });
    } else {
        res.status(403).send({message: 'Error en el controlador, params undefined'} );
    }
}

function obtenerDetalleLista(req, res) {
    model.obtenerDetalleLista(req.params.id, function (error, response) {
        if (error) {
            res.status(500).send({ error: error });
        } else {
            if (response.error) {
                res.status(200).send({ error: response.error });
            } else {
                res.status(200).send({ data: response.data });
            }
        }
    });
}

//exporto los metodos en forma de un objeto
module.exports={
    obtenerListas,
    guardarLista,
    actualizarLista,
    eliminarLista,
    obtenerDetalleLista
}