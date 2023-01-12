"use strict";

const jwt = require("jsonwebtoken");
const SECRET_KEY = "secretkey123456"; //cambiar!!!

exports.authorization = function (req, res, next) {
  let token = req.headers["authorization"];
  jwt.verify(token, SECRET_KEY, function (err, decodedToken) {
    if (err) {
      console.log(err);
      return res.status(404).send({ error: "El token NO es valido" });
    } else {
      req.id_usuario = decodedToken.id; // Add to req object
      next();
    }
  });
};
