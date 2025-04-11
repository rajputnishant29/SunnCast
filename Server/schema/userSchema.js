const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userEmail : String,
    userName : String,
    password: String,
    likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
});

module.exports = mongoose.model('User',UserSchema);