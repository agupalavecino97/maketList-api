"use strict";
var connection = require("../connection");


var model = {
    id: null,
    nombre: null,
    precio: null,
    estado: null,
    fecha: null,
    id_usuario: null
};
 
model.guardarLista = async function(lista, items, callback) {
    console.log('model.guardar.lista', lista);
    console.log('model.guardar.items', items);
    if (connection) {
        var verificar_nombre = 'SELECT * FROM lista WHERE eliminado = 0 AND id_usuario = '+ connection.escape(lista.id_usuario) +' AND nombre = ' + connection.escape(lista.nombre);
		connection.query(verificar_nombre, function(error, result_verificar_nombre) {
			if(error) {				
                // throw error; 
                callback(null, {"error": 'Error al verificar nombre en base de datos.'}); 
			} else {
                if (result_verificar_nombre.length > 0) {
                    callback(null, {"message": 'Ya existe una lista con el mismo nombre, por favor intente con otro.'});
                } else {
                    connection.query("INSERT INTO lista SET ?", lista, function(error, result_inert)  {
                        if(error) {
                            //throw error;
                            callback(null, {"error": 'Error al insertar en base de datos.'});
                        } else {
                            // let itemsInsert = '';
                            id_lista = result_inert.insertId;
                            items.forEach( item => {
                                item.id = id_lista
                            });
                            console.log(items);
                            connection.query("INSERT INTO lista-item SET ?", items, function(error, result_inert)  {
                                if(error) {
                                    //throw error;
                                    callback(null, {"error": 'Error al insertar en base de datos.'});
                                } else { 
                                    callback(null, {"message": 'Lista guardad correctamente.'});
                                }
                            });

                        }
                    });
                }
			}
		});
    }
};


module.exports = model;
