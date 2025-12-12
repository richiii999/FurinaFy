import SongCard from "./SongCard";
import MusicPlayer from "./MusicPlayer";
import{ useState} from "react";



function SongsScreen({ items = [], playlists = [], query = "", onAddToPlaylist, onDeleteSong }) {
  const safeQuery = query.toLowerCase();

  const filtered = items.filter(song =>
    song.title?.toLowerCase().includes(safeQuery)
  );


/***************HANDLES THE PLAYER AND THE SONG IF CLICKED******* */
const [curr,setcurr] = useState(null);


function handleSongClick(song){

setcurr({

audioSrc:song.song,
title: song.title,
imagine:song.picture

});
}

/***************************** */



  return (
    <div>
    <div className={"SongsScreen"}>
     
     {items.map((song) => (
        <SongCard
          key={song._id}
          id={song._id}
          name={song.title}
          length={song.length}
          artist={song.artist}
          picture={song.picture}
          audio={song.song}
          playlists={playlists}
          onAddToPlaylist={onAddToPlaylist}
          onDeleteSong={onDeleteSong}


          onClick={()=> handleSongClick(song)}
        />
      ))}

    </div>


    <MusicPlayer audioSrc={curr?.audioSrc} title={curr?.title} imagine={curr?.imagine} showPlaylistControls={false}></MusicPlayer>

  </div>
  );
}

export default SongsScreen;
