'use strict'

//modelos
var model = require('../models/listas.model');


function obtenerListas(req, res) {
    model.obtenerListas(req.id_usuario, function (error, resultado) {
        if (error) {
            res.status(500).send({ message: 'Error al Obtener todos.' });
        } else {
            res.status(200).send(resultado);
        }
    });
}


function guardarLista(req, res) {
    let params = req.body; 
    // //console.log('guardarFormaPago-Controller: ');//console.log(params); 
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
    var params = req.body;
    // //console.log('actualizarFormaPago', params);
    if (params) {
        model.actualizarLista(params, (error, resultado) => {
            if (error) {
                res.status(500).send({ message: 'Error al actualizar.' });
            } else {
                if (resultado.message) {
                    res.status(200).send({message: resultado.message});
                } else {
                    res.status(200).send({data: resultado});
                }
            }
        });
    } else {
        res.status(403).send({message: 'Error en el controlador, params undefined'} );
    }
}

function eliminarLista(req, res) {
    var id = params.id;
    if (id) {
        model.eliminarLista(id, (error, resultado)=>{
            if (error) { 
                res.status(500).send({message: "Error al eliminar."});
            } else {
                if (resultado.message) {
                    res.status(200).send({message: resultado.message});
                } else {
                    res.status(200).send({data: resultado});
                }
            }
        });
    } else {
        res.status(403).send({message: 'Error en el controlador, params undefined'} );
    }
}

//exporto los metodos en forma de un objeto
module.exports={
    obtenerListas,
    guardarLista,
    actualizarLista,
    eliminarLista
}