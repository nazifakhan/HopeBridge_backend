import dotenv from "dotenv";
import app from "../src/app.js";
import connectDatabase from "../src/config/db.js";

dotenv.config();

export default async function handler(req, res) {
  try {
    await connectDatabase();
    return app(req, res);
  } catch (error) {
    console.error("Database connection failed:", {
      message: error.message,
      name: error.name,
      code: error.code
    });
    return res.status(500).json({ message: "Database connection failed" });
  }
}
