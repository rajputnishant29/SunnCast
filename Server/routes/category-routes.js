const express = require('express');
const router = express.Router();
const Song = require('../schema/songSchema');

router.get('/category/:categoryName', async (req, res) => {
  const { categoryName } = req.params;

  try {
    const songs = await Song.find({ category: { $regex: categoryName, $options: 'i' } });

    if (songs.length === 0) {
      return res.status(404).json({ message: "No songs found in this category." });
    }

    res.status(200).json({ songs });
  } catch (error) {
    console.error("Error fetching songs by category:", error);
    res.status(500).json({ error: "Failed to fetch songs from the database." });
  }
});

module.exports = router;
