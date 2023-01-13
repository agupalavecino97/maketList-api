"use stric";

var mysql = require("mysql");

var connection = mysql.createConnection({
  // --Local server
  // host: "127.0.0.1",
  // user: "root",
  // password: "",
  // database: "market_list",
  // port: 3306,

  host: "ik1eybdutgxsm0lo.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "iahznrf7bpg8d976",
  password: "n2mgec6zh86tl8x4",
  database: "wydx7aql7x2x9fbx",
  port: 3306,

  //Palavecino+2014
});

module.exports = connection;
