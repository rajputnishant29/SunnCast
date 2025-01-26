const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs')

router.get('/category/:categoryName', (req,res) => {
    const { categoryName } = req.params

    const filePath = path.join(__dirname, "../public/Songs.json");

    fs.readFile(filePath, "utf8", (err,data) => {
        if(err){
            return res.status(500).json({ error: "Failed to read the songs file."});
        }


        try {
            const songs = JSON.parse(data);
            const filteredSongs = songs.filter((song) => song.category.toLowerCase() === categoryName.toLowerCase());

            if(filteredSongs.length === 0){
                return res.status(404).json({ message: "No songs found in this category." });
            }
            res.status(200).json({ songs: filteredSongs });
        } catch (error) {
            res.status(500).json({ error: "Failed to parse the songs file." });
        }
    })
})
module.exports = router;