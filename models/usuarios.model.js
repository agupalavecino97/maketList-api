"use strict";
var connection = require("../connection");

var bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secretkey123456"; //cambiar!!

var model = {
  id: null,
  email: null,
  password: null,
  nombre: null,
  fecha_registro: null,
};

model.login = async function (datos, callback) {
  if (connection) {
    var select_usuario =
      "SELECT * FROM usuario WHERE email = " + connection.escape(datos.email);
    connection.query(select_usuario, function (error, result_select_usuario) {
      if (result_select_usuario.length == 0) {
        callback(null, { error: "Email o contraseña incorrectos" });
      } else {
        let usuario = result_select_usuario[0];
        if (
          bcrypt.compareSync(datos.password, usuario.password) ||
          bcrypt.compareSync("'" + datos.password + "'", usuario.password)
        ) {
          // const expiresIn = 6 * 60 * 60;
          // const accessToken = jwt.sign({ id: usuario.id }, SECRET_KEY, { expiresIn: expiresIn });
          const accessToken = jwt.sign({ id: usuario.id }, SECRET_KEY);
          let user = usuario.nombre;
          callback(null, { accessToken, user });
        } else {
          callback(null, { error: "Email o contraseña incorrectos" });
        }
      }
    });
  }
};

model.registro = function (data, callback) {
  if (connection) {
    connection.query(
      "SELECT usuario.*" +
        "FROM usuario AS usuario " +
        "WHERE usuario.email = " +
        connection.escape(data.email),
      function (error, row) {
        if (error) {
          // throw error;
          callback(null, { error: "Error en consulta SQL" });
        } else {
          if (row.length > 0) {
            callback(null, {
              error:
                "El email ingresado ya esta registrado en el sistema, por favor ingrese otro.",
            });
          } else {
            // encripto la contraseña
            let pass = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
            // guardo el usuario
            let fecha_registro = new Date(
              Date.now() - new Date().getTimezoneOffset() * 60000
            )
              .toISOString()
              .split("T")[0];
            var insert =
              "INSERT INTO usuario (email, password, nombre, fecha_registro) " +
              "VALUES ( '" +
              data.email +
              "', '" +
              pass +
              "', '" +
              data.name +
              "', '" +
              fecha_registro +
              "');";
            connection.query(insert, function (error, result_inert) {
              if (error) {
                // throw error;
                callback(null, { error: "ERROR INSERT SQL." });
              } else {
                const accessToken = jwt.sign({ id: usuario.id }, SECRET_KEY);
                let user = data.name;
                callback(null, { accessToken, user });
              }
            });
          }
        }
      }
    );
  }
};

module.exports = model;
