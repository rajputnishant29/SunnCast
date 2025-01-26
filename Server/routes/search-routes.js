const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const songsFilePath = path.join(__dirname, '../public/Songs.json');

router.get('/search-song', (req,res) => {
    const {query} = req.query;

    if(!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
    }
    try {
        console.log("Resolved path to Songs.json:", songsFilePath);
        const songsData = JSON.parse(fs.readFileSync(songsFilePath, 'utf-8'))
        const filteredSongs = songsData.filter((song) =>
            song.title.toLowerCase().includes(query.toLowerCase()) ||
            song.artist.some((artist) => artist.toLowerCase().includes(query.toLowerCase()))
        );
        res.status(200).json(filteredSongs);
    } catch (error) {
        res.status(500).json({ message: 'Error reading songs data', error });
    }
});

module.exports = router;