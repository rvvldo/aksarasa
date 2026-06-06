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

export const validate = (schema) => {
  try {
    schema.parse({
      body: req.body, //disini kita akan memvalidasi req.body dengan menggunakan schema yang sudah kita buat dengan zod, sehingga kita bisa memastikan bahwa data yang dikirim oleh client sesuai dengan yang kita harapkan, dan juga agar bisa di maintenance kedepannya, sehingga apabila ada perubahan pada data yang dikirim oleh client, kita hanya perlu mengubahnya di satu tempat saja yaitu di schema yang sudah kita buat dengan zod, sehingga lebih efisien dan mudah untuk di maintenance kedepannya
      query: req.query, //disini kita akan memvalidasi req.query dengan menggunakan schema yang sudah kita buat dengan zod, sehingga kita bisa memastikan bahwa data yang dikirim oleh client sesuai dengan yang kita harapkan, dan juga agar bisa di maintenance kedepannya, sehingga apabila ada perubahan pada data yang dikirim oleh client, kita hanya perlu mengubahnya di satu tempat saja yaitu di schema yang sudah kita buat dengan zod, sehingga lebih efisien dan mudah untuk di maintenance kedepannya
      params: req.params, //disini kita akan memvalidasi req.params dengan menggunakan schema yang sudah kita buat dengan zod, sehingga kita bisa memastikan bahwa data yang dikirim oleh client sesuai dengan yang kita harapkan, dan juga agar bisa di maintenance kedepannya, sehingga apabila ada perubahan pada data yang dikirim oleh client, kita hanya perlu mengubahnya di satu tempat saja yaitu di schema yang sudah kita buat dengan zod, sehingga lebih efisien dan mudah untuk di maintenance kedepannya
    });
    next(); //disini kita akan melanjutkan ke middleware atau route handler selanjutnya
  } catch (error) {
    const errorMessage = error.errors.map((err) => err.message);

    return res.status(400).json({
      success: false,
      code: "VALIDATION_ERROR",
      message: errorMessage,
    });
  }
};
