// Get an instance of mysql we can use in the app

var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials

var pool = mysql.createPool({
    connectionLimit : 10,
    host            : MYSQLHOST,
    user            : MYSQLUSER,
    password        : MYSQLPORT,
    database        : MYSQL_DATABASE
})

// Export it for use in you app
module.exports.pool = pool;
