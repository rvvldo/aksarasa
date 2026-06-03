import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { pool } from "../config/db.js";
import { errorHandler } from "../middleware/errorhandler.middleware.js";
import { createUser, findUserByEmail } from "../model/user.model.js";
import { jwtGenerator } from "../utils/jwtGenerator.js";

dotenv.config();

export const login = async (req, res, next) => {
  const { email, password } = req.body; //disinii kita mengambil email dan password dari req.body dari nembak api di json nya, parameter req kita dapatkan di inisialisasi dari awal function

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password harus diisi" }); //apabila di req.body nya bukan email password/kosong maka akan return json dan status 400
  }

  try {
    const user = await findUserByEmail(email); //nah disini kita menggunakan function findUserByEmail dari user.model.js agar kode nya tidak terlalu panjang dan efisien apabila ada perubahan sehingga mudah dimaintainance dan di scalling

    if (!user) {
      return res
        .status(401)
        .json({ message: "Email atau password tidak ditemukan" }); //Disini apabila user.rows nya tidak ditemukan yang dimana artinya user.rows[] index nya ngga ada, maka akan ngereturn json dan status 400 karna dalam pencarian email, di rows nya harus index nya 0, atau ngga length nya === 1 tidak sama dengan 0
    }
    const verifPassword = await bcrypt.compare(password, user.password); //Nah setelah itu, kita akan membandingkan password dari req.body dan password yang ada di table users.password yang ada didatabase sebelumnya yang sudah di registrasi

    if (!verifPassword) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const token = jwtGenerator(user); //disini setelah verifikasi, maka akan dikasih token, token ini semacam tiket masuk untuk user agar bisa diberikan akses selama di dalam platform, sehingga bisa mencoba seperti wahana permainann, jadi orang lain walaupun bisa melakukan celah keamanan email dan password akan tetapi tidak memiliki akses untuk masuk karena tokennya sudah ditempelkan

    return res.status(200).json({
      success: true,
      message: "Login berhasil",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        koin: user.koin,
        dompet: user.dompet,
      },
      token: token,
    });
  } catch (error) {
    next(errorHandler(error)); //disini kita menggunakan import erorhandler untuk mengefesiensi kode sekaligus agar bisa di maintenance kedepannya
  }
};

export const register = async (req, res, next) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res
      .status(400)
      .json({ message: "Email, password, dan username harus diisi" });
  }

  try {
    const adaUser = await findUserByEmail(email);

    if (adaUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); //Nah disini kita akan menghash password dari req.body sebelum disimpan ke database, sehingga apabila ada celah keamanan, maka password yang tersimpan di database tidak akan langsung terlihat, karena sudah di hash, dan untuk membandingkan password yang di req.body dengan password yang ada di database, kita menggunakan bcrypt.compare seperti yang sudah dijelaskan diatas pada function login, sehingga apabila ada celah keamanan, maka password yang tersimpan di database tidak akan langsung terlihat, karena sudah di hash, dan untuk membandingkan password yang di req.body dengan password yang ada di database, kita menggunakan bcrypt.compare seperti yang sudah dijelaskan diatas pada function login

    const newUser = await createUser(email, hashedPassword, username);

    return res.status(201).json({
      success: true,
      message: "User berhasil didaftarkan",
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    next(errorHandler(error));
  }
};
