import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

// Allow configured origin (or same-origin fallback).
// withCredentials on the client requires an explicit origin, not "*".
const allowedOrigin = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

// Connect to DB on every request (serverless-safe: connection is cached in db.js)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("DB connection failed:", error.message);
    return res.status(503).json({ message: "Database unavailable. Please try again." });
  }
});


// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Auth API is running",
  });
});


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


// 404
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});


const PORT = process.env.PORT || 5000;


// Local development only
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


// Vercel uses the exported Express application
export default app;