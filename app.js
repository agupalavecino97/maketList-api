'use stric'  // para poder usar nuevas funcionalidades de javascript

var express = require ('express');
var bodyParser = require('body-parser');//para convertir lo que llega a traves de las peticiones en un objeto json
var app = express();


// cargar rutas
var users_route = require('./routes/users.route');


//cargo los middlewares: se ejecutan antes que las funciones cuando se hace una peticion http
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());  // convierte lo que trae la peticion a un objeto json


//configurar cabeceras y CORS
 app.use((req, res, next)=>{
     res.header("Access-Control-Allow-Origin","*");
     res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Authorization');
     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
     next();
 });

//configurar rutas base (midleware)
app.use('/api/users', users_route);


//metodo para probar
app.get('/probando', (req, res) =>{
    res.status(200).send({message: "Esto es una prueba"});
});

module.exports = app;