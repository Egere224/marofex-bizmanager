import bcrypt from "bcrypt";
import pool from "../../config/db.js";
import jwt from "jsonwebtoken";
import { AppError } from "../../utils/AppError.js";

export const registerUser = async (full_name, email, password, phone) => {
  try {
    // 🔍 Check email OR phone in one query
    const existing = await pool.query(
      `SELECT email, phone FROM users WHERE email = $1 OR phone = $2`,
      [email, phone]
    );

    if (existing.rows.length > 0) {
      const user = existing.rows[0];

      if (user.email === email) {
        throw new AppError("Email already exists", 409);
      }

      if (user.phone === phone) {
        throw new AppError("Phone number already exists", 409);
      }
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 insert user
    const result = await pool.query(
      `INSERT INTO users(full_name, email, password_hash, phone)
       VALUES($1,$2,$3,$4)
       RETURNING id, full_name, email, phone, role`,
      [full_name, email, hashedPassword, phone]
    );

    return result.rows[0];

  } catch (error) {

    // 🔥 fallback: DB-level duplicate (race condition protection)
    if (error.code === "23505") {
      if (error.constraint === "users_email_key") {
        throw new AppError("Email already exists", 409);
      }

      if (
        error.constraint === "users_phone_key" ||
        error.constraint === "users_phone_unique"
      ) {
        throw new AppError("Phone number already exists", 409);
      }
    }

    throw error;
  }
};

export const loginUser = async (email, password) => {

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
     throw new AppError("Invalid email or password", 401);
  }

  const user = result.rows[0];

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role
    },
  };
};