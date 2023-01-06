"use strict";
var connection = require("../connection");

var bcrypt = require("bcrypt-nodejs");
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkey123456';  //cambiar!!

var model = {
    id: null,
    email: null,
    password: null,
    nombre: null,
    fecha_registro: null,
};
 
model.login = async function(datos, callback) {
    console.log('model.login.data', datos);
    if (connection) {
        var select_usuario = "SELECT * FROM usuario WHERE email = " + connection.escape(datos.email);
        connection.query(select_usuario, function(error, result_select_usuario) {
            if (result_select_usuario.length == 0) {
                callback(null, { error: "Email o contraseña incorrectos" });
            } else {
                    console.log(result_select_usuario)
                    let usuario = result_select_usuario[0];
                    if (bcrypt.compareSync(datos.password, usuario.password)  || bcrypt.compareSync("'"+datos.password+"'", usuario.password)){                     
                        const expiresIn = 6 * 60 * 60;
                        const accessToken = jwt.sign({ id: usuario.id }, SECRET_KEY, { expiresIn: expiresIn });
                        let user = usuario.nombre;
                        callback(null, {expiresIn, accessToken, user});   
                    } else {
                        callback(null, { error: "Email o contraseña incorrectos" });
                    }
            }
            
        })
    }
};

model.registro = function(data, callback) {
    console.log('model.registro.data', data)
    if (connection) {
        connection.query(
            "SELECT usuario.*"+
            "FROM usuario AS usuario "+  
            "WHERE usuario.email = "+connection.escape(data.email),
            function(error, row) {
                if (error) {
                    // throw error;
                    callback(null, { error: "Error en consulta SQL" });
                } else {
                    console.log(row)
                    if (row.length > 0){
                        callback(null, { error: "El email ingresado ya esta registrado en el sistema, por favor ingrese otro." });
                    }else{
                        // encripto la contraseña
                        let pass = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10)); 
                        // guardo el usuario
                        let fecha_registro = new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000)).toISOString().split('T')[0];
                        // let fe = fecha_registro.split('-');
                        // let fr = fe[2]+'/'+fe[1]+'/'+fe[0];
                        console.log(fe, fr)
                        var insert ="INSERT INTO usuario (email, password, nombre, fecha_registro) " +
                            "VALUES ( '" +
                            data.email +
                            "', '" +
                            pass+
                            "', '" +
                            data.name +
                            "', '" +
                            fecha_registro +
                            "');";
                        connection.query(insert, function(error, result_inert) {
                            if (error) {
                                throw error;
                                callback(null, { error: "ERROR INSERT SQL." });
                            } else { 
                                callback(null, { data: result_inert.insertId });
                            }
                        });
                    }
                }
            });    
    }   
};


module.exports = model;
