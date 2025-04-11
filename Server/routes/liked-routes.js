const express = require('express');
const router = express.Router();
const Song = require('../schema/songSchema');
const User = require('../schema/userSchema');

router.post('/like/:songId' ,async(req, res) => {
    const {userId } = req.body;
    try {
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({ message: "User not found" })
        if (user.likedSongs.includes(req.params.songId)) {
            return res.status(400).json({ message: "Song already liked" });
        }

        user.likedSongs.push(req.params.songId);
        await user.save();
        res.json({ message: "Song liked", likedSongs: user.likedSongs });
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }

    router.post("/unlike/:songId", async (req, res) => {
        const { userId } = req.body;
      
        try {
          const user = await User.findById(userId);
          if (!user) return res.status(404).json({ message: "User not found" });
      
          user.likedSongs = user.likedSongs.filter(
            (songId) => songId.toString() !== req.params.songId
          );
          await user.save();
      
          res.json({ message: "Song unliked", likedSongs: user.likedSongs });
        } catch (error) {
          res.status(500).json({ message: "Server error", error });
        }
    });

    router.get("/liked-songs/:userId", async (req, res) => {
        try {
          const user = await User.findById(req.params.userId).populate("likedSongs");
          if (!user) return res.status(404).json({ message: "User not found" });
      
          res.json({ likedSongs: user.likedSongs });
        } catch (error) {
          res.status(500).json({ message: "Server error", error });
        }
      });
})

module.exports = router;