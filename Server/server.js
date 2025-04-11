require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require('./routes/auth-routes')
const musicRoutes = require('./routes/music-routes');
const categoryRoutes = require('./routes/category-routes');
const likedRoutes = require('./routes/liked-routes');
const cors = require('cors')
const path = require('path');
const fs = require("fs"); 
const { MongoClient, GridFSBucket } = require('mongodb');

const PORT = process.env.PORT || 3000;

MONGO_URI = "mongodb+srv://nishantrajput7017:8ouAjZZZTVM25SmL@cluster0.9mlmc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(MONGO_URI).then(() => console.log("connected"))

app.use(cors({ 
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE"],
 }))

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/music',musicRoutes);
app.use('/song',categoryRoutes);
app.use('/liked', likedRoutes);
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/api/songs', (req, res) => {
    const filePath = path.join(__dirname, "songs.json");
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading songs.json:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})