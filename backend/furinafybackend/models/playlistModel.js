const mongoose = require('mongoose');

const playlistSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please enter playlist name"]
    },
    songs : [{
        type : String,
    }]
    },
{
    timestamps : false
})

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;