const express = require("express");
const multer = require("multer");
const path = require("path");
const router = require("./auth-routes");
const cloudinary = require("cloudinary").v2;
const Song = require("../schema/songSchema");
const fs = require("fs");
const { error } = require("console");
const { WriteError } = require("mongodb");

cloudinary.config({
  cloud_name: "dld2yrqe2",
  api_key: "283869716158789",
  api_secret: "C8AwRqy88JQ0ZXmNEDJnkalzKvk",
});

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "audio/mpeg") {
    cb(null, true);
  } else {
    cb(new Error("Only MP3 files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});


router.post("/upload-music", upload.single("mp3file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Please upload an MP3 file." });
  }

  const { title, artist, category } = req.body;

  if (!title || !artist || !category) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const result = await cloudinary.uploader.upload_stream(
    {
      resource_type: "auto",
      public_id: `songs/${Date.now()}_${path.basename(
        req.file.originalname,
        path.extname(req.file.originalname)
      )}`,
      folder: "music",
    },
    async (error, result) => {
      if (error) {
        console.error("Error uploading to cloudinary:", error);
        return res
          .status(500)
          .json({ error: "Failed to upload to Cloudinary." });
      }
      const url = result.secure_url;

      const newSong = new Song({
        title,
        artist: artist.split(','),
        category,
        url,
      }) 
      await newSong.save();

      return res.status(201).json({
        message: "Song uploaded and saved successfully.",
        song: newSong,
      });
    }
  ).end(req.file.buffer);
});

router.get('/allsongs', async(req,res) => {
  try {
    const songs = await Song.find(); // Find all songs in the database
    return res.status(200).json(songs);
  } catch (error) {
    console.error("Error fetching songs:", error);
    return res.status(500).json({ error: "Failed to fetch songs." });
  }
})

//search
router.get("/search", async (req, res) => {
  const { query } = req.query; // Get the search query from the URL

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required." });
  }

  try {
    const songs = await Song.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // Case-insensitive match for title
        { artist: { $regex: query, $options: 'i' } }, // Case-insensitive match for artist
        { category: { $regex: query, $options: 'i' } }, // Case-insensitive match for category
      ],
    });

    res.json(songs);
  } catch (error) {
    console.error("Error searching for songs:", error);
    res.status(500).json({ error: "Failed to search for songs." });
  }
});
module.exports = router;
