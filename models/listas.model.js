"use strict";
let connection = require("../connection");


let model = {
    id: null,
    nombre: null,
    precio: null,
    estado: null,
    fecha: null,
    id_usuario: null
};
 
model.obtenerListas = async (id_usuario, callback) => {
    if (connection) {
        let obtener_listas = 'SELECT * FROM lista WHERE eliminado = 0 AND id_usuario = '+ connection.escape(id_usuario);
		connection.query(obtener_listas, (error, res) => {
            if (error) {
                callback( null, {'error': 'Error al obtener listas'});
            } else {
                callback( null, {'data': res});
            }
        });

    }
}

model.guardarLista = async function(lista, items, callback) {
    if (connection) {
        let verificar_nombre = 'SELECT * FROM lista WHERE eliminado = 0 AND id_usuario = '+ connection.escape(lista.id_usuario) +' AND nombre = ' + connection.escape(lista.nombre);
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

model.eliminarLista = async (id, callback) => {
    if (connection) {
        let eliminar_lista = 'DELETE FROM lista WHERE id = '+ connection.escape(id);
		connection.query(eliminar_lista, (error, res) => {
            if (error) {
                callback( null, {'error': 'Error al eliminar lista'});
            } else {
                let eliminar_items = 'DELETE FROM lista_item WHERE id_lista = '+ connection.escape(id);
                connection.query(eliminar_items, (error, res) => {
                    if (error) {
                        callback( null, {'error': 'Error al eliminar items'});      
                    } else {
                        callback( null, {'message': 'Eliminado Correctamente'});

                    }
                });

            }
        });

    }
}

model.obtenerDetalleLista = async (id, callback) => {
    if (connection) {
        let obtener_detalle_lista = 'SELECT * FROM lista_item WHERE id_lista = '+ connection.escape(id);
		connection.query(obtener_detalle_lista, (error, res) => {
            if (error) {
                callback( null, {'error': 'Error al obtener listas'});
            } else {
                callback( null, {'data': res});
            }
        });

    }
}

model.actualizarLista = async function(items, id_lista, callback) {
    if (connection) {
        let itemsInsert = '';
        items.forEach( item => {
            if (item.id_lista == null) {
                itemsInsert = itemsInsert + '(' + null + ',"' + item.valor + '",' + item.estado + ',' + id_lista + '),';
            } else {
                connection.query("UPDATE lista_item SET estado = " + item.estado + " WHERE id = " + item.id , function(error, result_inert)  {
                    if(error) {
                        callback(null, {"error": 'Error al actualizar base de datos.'});
                    }
                })

            }
        });
        if (itemsInsert.length) {
            itemsInsert = itemsInsert.slice(0, -1);
            connection.query("INSERT INTO lista_item (id, valor, estado, id_lista) VALUES " + itemsInsert, function(error, result_inert)  {
                if(error) {
                    callback(null, {"error": 'Error al insertar en base de datos.'});
                } else {
                    callback(null, {"message": "Lista actualizada correctamente"});
                }
            });
        } else {
            callback(null, {"message": "Lista actualizada correctamente"});
        }
        
    }
};

module.exports = model;
