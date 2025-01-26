const mongoose = require('mongoose')

const MusicSchema = new mongoose.Schema({
    musicName : String,
    musicFileName: String,
    musicPath: String,
});

module.exports = mongoose.model('File',MusicSchema);