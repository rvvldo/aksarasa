import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const jwtGenerator = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    }, //disini kita akan memasukkan payload yang ingin kita simpan di token, yang dimana biasanya adalah informasi user seperti id, email, username, dan role, sehingga ketika kita memverifikasi token, kita bisa mendapatkan informasi user tersebut dari token tersebut
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  return token;
};
