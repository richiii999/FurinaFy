import { useState } from "react";

function SongCard({ //all the stuff that we got from the DB + stuff that we got originally (we can remove some stuff if we want but it works)
  id, 
  name, 
  length, 
  artist, 
  picture, 
  audio, 
  playlists = [], 
  onAddToPlaylist, 
  onDeleteSong,
  onRemoveFromPlaylist,
  playlistId
}) {
  //initialization of stuff
  const songName = name || "Untitled Song";
  const songLength = length || "0:00";
  const songArtist = artist || "Unknown Artist";

  const [open, setOpen] = useState(false);

  //checks to see if the song can be put in a playlist or if a playlist even exists
  const availablePlaylists = playlists.filter(
    (pl) => !pl.songs.some((s) => s.id === id)
  );

  //helps add all the song information needs to the playlist
  const handleAddToPlaylist = (playlistId) => {
    const songData = { id, name: songName, artist: songArtist, length: songLength, picture, audio };
    onAddToPlaylist(songData, playlistId);
    setOpen(false);
  };

  return (
    <div className="songCard">

      {/* show the actual picture from DB */}
      {picture && <img className="songImage" src={picture} alt="song" />}

      <h2 className="songTitle">{songName}</h2>
      <p className="songLength">{songLength}</p>
      <p className="songArtist">{songArtist}</p>

      {/* audio player */}
      {audio && (
        <audio controls src={audio}></audio>
      )}

      <button onClick={() => setOpen(prev => !prev)}>Add to Playlist</button>
      <button onClick={() => onDeleteSong(id)}>Delete Song</button>
      
      {playlistId && onRemoveFromPlaylist && ( //this only allows it to show on the playlist screen 
      <button onClick={() => onRemoveFromPlaylist(id, playlistId)}>Remove from Playlist</button>
      )}


      {open && (
        <div>
          {availablePlaylists.length === 0 && (
            <p>No available playlists.</p>
          )}
          {/*all this code is doing is basically generating the checkboxs for you to actually add a song to an available playlist, if there is one
          (it also prevents duplicate songs from entering a playlist)*/}
          {availablePlaylists.map((pl) => (
            <div key={pl.id}>
              <input
                type="checkbox"
                id={`pl_${pl.id}_${songName}`}
                onChange={() => handleAddToPlaylist(pl.id)}
              />
              <label htmlFor={`pl_${pl.id}_${songName}`}>
                Add to {pl.name}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SongCard;
