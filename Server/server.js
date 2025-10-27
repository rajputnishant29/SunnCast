require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

// ✅ CORS first
app.use(
  cors({
    origin: ["http://localhost:5173", "https://sunncast.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ MongoDB connection
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://nishantrajput7017:8ouAjZZZTVM25SmL@cluster0.9mlmc.mongodb.net/suncast?retryWrites=true&w=majority&tls=true";

mongoose
  .connect(MONGO_URI, { ssl: true })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));

// ✅ Import routes
app.use("/auth", require("./routes/auth-routes"));
app.use("/music", require("./routes/music-routes"));
app.use("/song", require("./routes/category-routes"));
app.use("/liked", require("./routes/liked-routes"));

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/api/songs", (req, res) => {
  const filePath = path.join(__dirname, "songs.json");
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    res.json(JSON.parse(data));
  });
});

app.get("/", (req, res) => {
  res.send("🎵 Suncast Backend is Running!");
});

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error("🔥 Server error:", err.message);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
