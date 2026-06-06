import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    username: z
      .string({ required_error: "Username harus diisi" })
      .min(3, { message: "Username minimal 3 karakter" })
      .max(20, { message: "Username maksimal 20 karakter" })
      .trim(),
    email: z
      .string({ required_error: "Email harus diisi" })
      .email({ message: "Email tidak valid" })
      .trim()
      .toLowerCase(),
    password: z
      .string({ required_error: "Password harus diisi" })
      .min(6, { message: "Password minimal 6 karakter" })
      .regex(/[A-Z]/, { message: "Password harus mengandung huruf kapital" })
      .regex(/[0-9]/, { message: "Password harus mengandung angka" })
      .trim(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email harus diisi" })
      .email({ message: "Email tidak valid" })
      .trim()
      .toLowerCase(),
    password: z
      .string({ required_error: "Password harus diisi" })
      .min(6, { message: "Password minimal 6 karakter" })
      .regex(/[A-Z]/, { message: "Password harus mengandung huruf kapital" })
      .regex(/[0-9]/, { message: "Password harus mengandung angka" })
      .trim(),
  }),
});

export const diskonSchema = z.object({
  body: z.object({
    
  })
})