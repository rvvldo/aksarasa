import { pool } from "../config/db.js";

export const koinSistemNovel = async (userId) => {
  const query = "UPDATE users SET koin = koin + 10 WHERE id = $1 RETURNING *";
  const values = [userId];

  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    throw new Error("User tidak ditemukan");
  }
  return result.rows[0];
};

export const koinBonusQuiz = async (userId) => {
  const query = "UPDATE users SET koin = koin + 5 WHERE id = $1 RETURNING *";
  const values = [userId];

  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    throw new Error("User tidak ditemukan");
  }
  return result.rows[0];
};
