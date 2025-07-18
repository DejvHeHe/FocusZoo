import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// ⬇️ Načtení .env proměnných (např. MONGO_URL)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// 🔧 Middleware
app.use(cors());
app.use(express.json());

// 🔗 MongoDB připojení
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 🧩 API route pro herní session
import sessionRoutes from "./routes/session.js";
app.use("/api/session", sessionRoutes);

// 🌍 Test route
app.get("/", (req, res) => {
  res.send("🐾 Zoo Timer backend běží!");
});

// 🚀 Start serveru
app.listen(PORT, () => {
  console.log(`🚀 Server běží na http://localhost:${PORT}`);
});
