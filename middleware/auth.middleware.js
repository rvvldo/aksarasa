import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifikasiToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; //disini kita akan mengambil token dari header authorization, yang dimana biasanya token itu dikirim dengan format "Bearer token", sehingga kita akan memisahkan string tersebut dengan split dan mengambil index ke 1 yang dimana adalah tokennya, apabila authHeader nya tidak ada maka token akan bernilai undefined

  if (!token) {
    return res.status(401).json({ message: "Token tidak ditemukan" }); //apabila token tidak ditemukan maka akan return json dan status 401
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //disini kita akan memverifikasi token dengan menggunakan jwt.verify, yang dimana kita akan memasukkan token dan secret key yang sudah kita buat di .env, apabila token valid maka akan mengembalikan decoded yang berisi payload dari token tersebut, apabila token tidak valid maka akan throw error
    req.user = decoded; //disini kita akan menyimpan decoded ke req.user agar bisa digunakan di route yang membutuhkan autentikasi, sehingga kita bisa mendapatkan informasi user dari token tersebut
    next(); //disini kita akan melanjutkan ke middleware atau route handler selanjutnya
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        success: false,
        code: "TOKEN_EXPIRED",
        message: "Token telah kedaluwarsa. Silahkan login kembali.",
      });
    }

    return res.status(403).json({
      success: false,
      code: "INVALID_TOKEN",
      message: "Token tidak valid",
    }); //apabila token tidak valid maka akan return json dan status 403
  }
};
