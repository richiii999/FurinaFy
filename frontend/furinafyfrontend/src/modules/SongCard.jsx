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
  playlistId,
  onClick
}) {
  
  const songName = name || "Untitled Song";
  const songLength = length || "0:00";
  const songArtist = artist || "Unknown Artist";

  const [open, setOpen] = useState(false);

  //filter playlists where this song is not already included
  const availablePlaylists = playlists.filter(
  (pl) => Array.isArray(pl.songs) && !pl.songs.some((sId) => String(sId) === String(id))
  );

  const handleAddToPlaylist = (plId) => {
    const songData = { _id: id, title: songName, artist: songArtist, length: songLength, picture, song: audio };
    onAddToPlaylist(songData, plId);
    setOpen(false);
  };

  return (
    <div className="songCard" >

      {picture && <img className="songImage" onClick={onClick} src={picture} alt="song" />}

      <h2 className="songTitle">{songName}</h2>
      <p className="songLength">{songLength}</p>
      <p className="songArtist">{songArtist}</p>

      {/* audio player 
      {audio && (
        <audio controls src={audio}></audio>
      )}
      */}
     
       <button className="songButton" onClick={() => setOpen(prev => !prev)}>Add to Playlist</button>
      
       <button className="deleteButton" onClick={() => onDeleteSong(id)}>Delete Song</button>
       
      {playlistId && onRemoveFromPlaylist && (
        <button className="removeButton" onClick={() => onRemoveFromPlaylist(id, playlistId)}>Remove from Playlist</button>
      )}

    <div className="play">
        <div >
            {open &&  (
              <div className="songDropdown">
                {availablePlaylists.length === 0 ? (
                  <p>No available playlists.</p>
                ) : (
                  availablePlaylists.map((pl) => (
                    <div key={pl._id}>
                      <input
                        type="checkbox"
                        id={`pl_${pl._id}_${songName}`}
                        onChange={() => handleAddToPlaylist(pl._id)}
                      />
                      <label htmlFor={`pl_${pl._id}_${songName}`}>Add to {pl.name}</label>
                    </div>
                  ))
                )}
              </div>
            )}
        </div>
    </div>
  </div>
 );
}

export default SongCard;
