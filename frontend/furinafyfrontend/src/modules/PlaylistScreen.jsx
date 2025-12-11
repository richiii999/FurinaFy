import PlaylistCard from "./PlaylistCard";
import {useState} from "react";
import MusicPlayer from "./MusicPlayer"

function PlaylistScreen({ //pass in all the items from screenswitcher for playlistscreen to utilize
  items, 
  onDeletePlaylist, 
  onAddToPlaylist, 
  onDeleteSong,
  onCreatePlaylist,
  onRemoveFromPlaylist  
}) {


/******************************/
const [curr,setcurr] = useState(null);


function handleSongClick(song){

setcurr({

audioSrc:song.song,
title: song.title,
imagine:song.picture

});
}


 /****************8*/


  return (
    <div>
    <div className="playlistScreen">

      {/*create a playlist*/}
      <button  className="Screenbutton"onClick={onCreatePlaylist}>+ Create Playlist</button>

      {/*checks to see if theres no playlists and prompts for the user to make one*/}
      {items.length === 0 && (
        <p>No playlists yet. Click “Create Playlist”.</p>
      )}




       {/* //prints out the actual playlist card to the screen */}
      {items.map((playlist) => ( 
        <div key={playlist.id}> 
          <PlaylistCard
         name={playlist.name}
            songs={playlist.songs}
            playlists={items}
            onAddToPlaylist={onAddToPlaylist}
            onDeleteSong={onDeleteSong}
            onRemoveFromPlaylist={onRemoveFromPlaylist} 
            onsong={handleSongClick}
          />
        
        
        
        {/* //delete playlist button*/}
          <button className="delete_playlist" onClick={() => onDeletePlaylist(playlist.id)}>
            {/*delete playlist button that actually deletes a playlist*/}
            Delete Playlist
          </button>
        </div>
      ))}
    </div>


       <MusicPlayer audioSrc={curr?.audioSrc} title={curr?.title} imagine={curr?.imagine}></MusicPlayer>

  </div>
  );
}

export default PlaylistScreen;


