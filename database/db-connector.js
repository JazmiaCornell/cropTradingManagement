var mysql = require("mysql2");
const fs = require("fs");

// Read the query file
const query = fs.readFileSync("./database/DDL.sql", "utf8");

var pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10, // Optional: limit concurrent connections
});

// Get a connection from the pool and execute the query
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.code, err.message);
    return;
  }

  console.log("Connected to MySQL database.");
  
});

module.exports.pool = pool;
