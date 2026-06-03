import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

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

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database", err);
  } else {
    console.log("Database connection successful", res.rows);
  }
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

pool.on("connect", () => {
  console.log("Connected to the database");
});
