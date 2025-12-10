const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const Song = require('./models/songModel');
const cors = require('cors');
app.use(express.json({limit : '4 gb'}));

app.use(cors());

app.get('/songs', async (req,res) => {
    try{
        const songs = await Song.find({});
        res.status(200).json(songs);
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
});

app.post('/song', async (req,res) => {
    try {
        const song = await Song.create(req.body);

        res.status(200).json(song);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//connect to mongodb (may need to use async)
mongoose.connect('mongodb://127.0.0.1:27017/Music_Player')
    .then(() => {
        console.log("Successfully connected to mongodb");
        app.listen(PORT, () => {
            console.log(`Express backend is listening at port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

