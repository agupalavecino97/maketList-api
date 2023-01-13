"use stric"; // usa los requisitos de los navegadores que utlicen HTTP

var app = require("./app");

var port = process.env.PORT || 8080; //toma una variabl de entorno, en este caso port
var connection = require("./connection");

connection.connect(function (error) {
  if (error) {
    console.log(
      "Ocurrio un error en la conexion con la base de datos: ",
      error
    );
  } else {
    app.listen(port, function () {
      console.log(
        "Esta escuchando en el puerto: " +
          port +
          ". http://localhost:" +
          port +
          " y conectado a la base de datos.\n...\n"
      );
    });
  }
});
