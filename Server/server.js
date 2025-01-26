require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require('./routes/auth-routes')
const musicRoutes = require('./routes/music-routes');
const categoryRoutes = require('./routes/category-routes');
const searchRoutes = require('./routes/search-routes');
const cors = require('cors')
const path = require('path');
const fs = require("fs"); 


MONGO_URI = "mongodb+srv://nishantrajput7017:8ouAjZZZTVM25SmL@cluster0.9mlmc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(MONGO_URI).then(() => console.log("connected"));

app.use(cors({ 
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE"],

 }))

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/music',musicRoutes);
app.use('/song',categoryRoutes);
app.use('/search',searchRoutes);
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

app.listen(3000, ()=>{
    console.log("Server is running");
})