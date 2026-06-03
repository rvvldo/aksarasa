import { pool } from "../config/db.js";

export const createUser = async (email, password, username) => {
  const query =
    "INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *";
  const values = [email, password, username];

  try {
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
};

export const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];

  try {
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error("Error finding user by email:", err);
    throw err;
  }
};
