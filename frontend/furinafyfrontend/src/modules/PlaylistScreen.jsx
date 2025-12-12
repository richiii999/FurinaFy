import PlaylistCard from "./PlaylistCard";
import {useState} from "react";
import MusicPlayer from "./MusicPlayer"


function PlaylistScreen({ //pass in all the items from screenswitcher for playlistscreen to utilize
 items,
  songs,
  onDeletePlaylist,
  onAddToPlaylist,
  onDeleteSong,
  onCreatePlaylist,
  onRemoveFromPlaylist,
  onUpdatePlaylist 
}) {

const [curr,setcurr] = useState(null);


function handleSongClick(song){

setcurr({

audioSrc:song.song,
title: song.title,
imagine:song.picture

});
}






  return (
    <div className="playlistScreen">

      {/*create a playlist*/}
      <button  className="Screenbutton" onClick={onCreatePlaylist}>+ Create Playlist</button>

      {/*checks to see if theres no playlists and prompts for the user to make one*/}
      {items.length === 0 && (
        <p>No playlists yet. Click “Create Playlist”.</p>
      )}

      {items.map((playlist) => ( //prints out the actual playlist card to the screen 
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
          />

          <button onClick={() => onDeletePlaylist(playlist.id)}>
            {/*delete playlist button that actually deletes a playlist*/}
            Delete Playlist
          </button>


          <button
      onClick={() =>
         onUpdatePlaylist(
         playlist._id,
      (items.find(p => p._id === playlist._id)?.songs || []) )
      }> Update Playlist</button>
 

        </div>
      ))}




 <MusicPlayer audioSrc={curr?.audioSrc} title={curr?.title} imagine={curr?.imagine}></MusicPlayer>
    </div>
  );
}

export default PlaylistScreen;


