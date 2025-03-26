// Get an instance of mysql we can use in the app

var mysql = require("mysql");

// Create a 'connection pool' using the provided credentials

var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQLPORT,
});

// Export it for use in you app
module.exports.pool = pool;
