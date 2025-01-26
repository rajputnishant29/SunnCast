const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = require('./auth-routes');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/music'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req,file,cb) => {
  if(file.mimetype === 'audio/mpeg'){
    cb(null,true);
  } else{
    cb(new Error('Only MP3 files are allowed'), true);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024},
})

const songsFilePath = path.join(__dirname, "../public/Songs.json");

router.post("/upload-music",upload.single('mp3file'), (req,res) => {
  console.log('Received file:', req.file); 
  if(!req.file){
    return res.status(400).json({ error: 'Please upload an MP3 file.' });
  }
  
  const {title, artist , category} = req.body;

  if (!title || !artist || !category) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const filePath = `public/music/${req.file.filename}`;

  fs.readFile(songsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading songs.json:", err);
      return res.status(500).json({ error: "Failed to read songs file." });
    }
    let songs = [];
    try {
      songs = JSON.parse(data || "[]"); // Use an empty array if the file is empty
    } catch (parseError) {
      console.error("Error parsing songs.json:", parseError);
      return res.status(500).json({ error: "Invalid songs file format." });
    }

    const newSong = {
      url: filePath,
      title,
      category,
      artist: artist.split(','), 
    }
    songs.push(newSong);
    fs.writeFile(songsFilePath, JSON.stringify(songs, null, 2), (writeError) => {
      if (writeError) {
        console.error("Error writing to songs.json:", writeError);
        return res.status(500).json({ error: "Failed to update songs file." });
      }
      return res.status(201).json({ message: "Song added successfully.",
        filePath: filePath,
        newSong: newSong
       });
    });
  });
});
module.exports = router;
