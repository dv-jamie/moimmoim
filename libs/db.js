const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "moim",
  connectionLimit: 10,
});

exports.getConnection = async () => {
  return await pool.getConnection();
};