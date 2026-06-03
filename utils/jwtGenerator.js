import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const jwtGenerator = (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  return token;
};