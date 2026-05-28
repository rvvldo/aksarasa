const { Pool } = require("pg");
require("dotenv").config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.query("SELECCT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database", err);
  } else {
    console.log("Database connection successful", res.rows);
  }
});

pool.on("connect", (res, err) => {
  if (err) {
    console.error("Error connecting to the database", err);
  } else {
    console.log("Database connection successful", res.rows);
  }
});
