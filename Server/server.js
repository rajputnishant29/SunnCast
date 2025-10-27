require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const app = express();

// ✅ Import Routes
const authRoutes = require("./routes/auth-routes");
const musicRoutes = require("./routes/music-routes");
const categoryRoutes = require("./routes/category-routes");
const likedRoutes = require("./routes/liked-routes");

const PORT = process.env.PORT || 3000;

// ✅ MongoDB Connection
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://nishantrajput7017:8ouAjZZZTVM25SmL@cluster0.9mlmc.mongodb.net/suncast?retryWrites=true&w=majority&tls=true";

mongoose
  .connect(MONGO_URI, {
    ssl: true,
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// ✅ Allowed Origins for CORS
const allowedOrigins = [
  "http://localhost:5173", // Local frontend
  "https://sunncast.vercel.app", // Deployed frontend
];

// ✅ CORS Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("🌐 Incoming request from:", origin);
      if (!origin) return callback(null, true); // Allow mobile apps / curl
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ API Routes
app.use("/auth", authRoutes);
app.use("/music", musicRoutes);
app.use("/song", categoryRoutes);
app.use("/liked", likedRoutes);

// ✅ Serve Public Folder
app.use("/public", express.static(path.join(__dirname, "public")));

// ✅ Temporary route to serve songs.json (if needed)
app.get("/api/songs", (req, res) => {
  const filePath = path.join(__dirname, "songs.json");
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading songs.json:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(JSON.parse(data));
  });
});

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.send("🎵 Suncast Backend is Running!");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
