import bcrypt from "bcrypt";
import pool from "../../config/db.js";
import jwt from "jsonwebtoken";
import { AppError } from "../../utils/AppError.js";

export const registerUser = async (full_name, email, password, phone) => {
  // check if user exists
  const existing = await pool.query(
    "SELECT id FROM users WHERE email=$1",
    [email]
  );

  if (existing.rows.length > 0) {
    throw new AppError("User already exists", 409);
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // insert user
  const result = await pool.query(
    `INSERT INTO users(full_name, email, password_hash, phone)
     VALUES($1,$2,$3,$4)
     RETURNING id, full_name, email, phone`,
    [full_name, email, hashedPassword, phone]
  );

  return result.rows[0];
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
      email: user.email
    },
    token
  };
};