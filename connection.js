


'use stric'

var mysql = require('mysql');

var connection = mysql.createConnection({
    // --Local server
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database: 'market_list',
    port: 3306

    //Palavecino+2014
});


module.exports = connection;