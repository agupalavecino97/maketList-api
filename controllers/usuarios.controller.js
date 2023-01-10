'use strict'

//modelos
var model = require('../models/usuarios.model');

//acciones
async function login(req, res) {
    var datos = req.body;
    if (datos) { 
        await model.login(datos, function(error, data) {    
            if (data.error) {
                res.status(200).send({error: data.error});
            } else {
                // data.usuario.password = "";//esta linea es para no mostrar la contraseña en consola por el front, por la consola del explorador.
                res.status(200).send({data: data});
            }
            
        });
    }else{
        res.status(403).send({error: 'Debe loguearse para poder realizar esta operacion'} );
    }
}

async function registro(req, res) {
    var datos = req.body;
    if (datos) {
        await model.registro(datos, function(error, data) {    
            if (data.error) {
                res.status(200).send({error: data.error});
            } else {
                res.status(200).send({data: data});
            }
            
        });
    } else {
        res.status(403).send({error: 'Debe loguearse para poder realizar esta operacion'} );
    }
}
//exporto los metodos en forma de un objeto
module.exports = {
    login,
    registro,
};
