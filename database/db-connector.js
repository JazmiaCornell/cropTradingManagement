var mysql = require("mysql2");
const fs = require("fs");

// Read the query file
const query = fs.readFileSync("./database/DDL.sql", "utf8");

var pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQL_DATABASE,
  url: process.env.MYSQL_URL,
  connectionLimit: 10, // Optional: limit concurrent connections
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.code, err.message);
  } else {
    console.log("Connected to MySQL database.");
    connection.release(); // Release connection back to pool
  }
});

module.exports.pool = pool;
