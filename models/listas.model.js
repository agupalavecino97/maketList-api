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
                            let itemsInsert = '';
                            let id_lista = result_inert.insertId;
                            items.forEach( item => {
                                itemsInsert = itemsInsert + '(' + null + ',"' + item.valor + '",' + item.estado + ',' + id_lista + '),';
                            });
                            itemsInsert = itemsInsert.slice(0, -1);
                            connection.query("INSERT INTO lista_item (id, valor, estado, id_lista) VALUES " + itemsInsert, function(error, result_inert)  {
                                if(error) {
                                    throw error;
                                    callback(null, {"error": 'Error al insertar en base de datos.'});
                                } else { 
                                    callback(null, {"data": id_lista});
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
