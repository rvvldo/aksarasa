import { pool } from "../config/db.js";

const member_discount = {
  gold: 0.5,
  silver: 0.3,
  reguler: 0,
};

export const diskonSistemHarga = async (userId, harga) => {
  const query = "SELECT member FROM users WHERE id = $1";
  const values = [userId];

  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    throw new Error("User tidak ditemukan");
  }

  const member = result.rows[0].member || "reguler"; // Jika member tidak ditemukan, anggap sebagai reguler
  const diskon = member_discount[member] || 0; // Jika member tidak valid, anggap sebagai reguler
  const totalDiskon = harga * diskon;
  const hargaSetelahDiskon = harga - totalDiskon;

  return {
    hargaAwal: harga,
    hargaSetelahDiskon: hargaSetelahDiskon,
  };
};
