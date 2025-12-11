const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
    title : {
        type : String,
        required : [true, "Please enter a title"]
    },

    length : {
        type : String,
        required : [true, "Please enter a length"]
    },
    picture : {
        type : String,
        required : [true, "Please enter base64 url of picture"]
    },
    song : {
        type : String,
        required : [true, "Please enter base64 url of .mp3 song"]
    }
    },
{
    timestamps : false
})

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
