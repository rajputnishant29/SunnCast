const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  url: String,
  title: String,
  artist: [String],
  category: String,
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;