import PlaylistCard from "./PlaylistCard";
import {useState} from "react";
import MusicPlayer from "./MusicPlayer"

function PlaylistScreen({
  items,
  songs,
  onDeletePlaylist,
  onAddToPlaylist,
  onDeleteSong,
  onCreatePlaylist,
  onRemoveFromPlaylist,
  onUpdatePlaylist
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

      {items.length === 0 && (
        <p>No playlists yet. Click “Create Playlist”.</p>
      )}




       {/* //prints out the actual playlist card to the screen */}
      {items.map((playlist) => ( 
        <div key={playlist.id}> 
          <PlaylistCard
         name={playlist.name}
          songs={(playlist.songs || [])
          .map(id => songs.find(song => String(song._id) === String(id)))
          .filter(Boolean)
          }
            playlists={items}
            onAddToPlaylist={onAddToPlaylist}
            onDeleteSong={onDeleteSong}
            onRemoveFromPlaylist={onRemoveFromPlaylist} 
            playlistId={playlist._id}
            onsong={handleSongClick}
          />
        
        
        
        {/* //delete playlist button*/}
          <button className="delete_playlist" onClick={() => onDeletePlaylist(playlist.id)}>
            {/*delete playlist button that actually deletes a playlist*/}
            Delete Playlist
          </button>


          <button onClick={() =>  onUpdatePlaylist(playlist._id, (items.find(p => p._id === playlist._id)?.songs || []))}>
             Update Playlist
          </button>

          
        </div>
      ))}
    </div>


       <MusicPlayer audioSrc={curr?.audioSrc} title={curr?.title} imagine={curr?.imagine}></MusicPlayer>

  </div>
  );
}

export default PlaylistScreen;
