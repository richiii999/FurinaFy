import { useState } from "react";
import songImg from "../assets/kitty.jpg";

function SongCard({ name, length, artist, playlists = [], onAddToPlaylist }) {
  // song info
  const songName = name || "Song Name";
  const songLength = length || "0:00";
  const songArtist = artist || "Song Artist";

  const [open, setOpen] = useState(false);

  // filter playlists where this song is NOT already present
  const availablePlaylists = playlists.filter(
    (pl) => !pl.songs.some((s) => s.name === songName)
  );

  const handleAddToPlaylist = (playlistId) => {
    const songData = { name: songName, artist: songArtist, length: songLength };
    if (onAddToPlaylist) {
      onAddToPlaylist(songData, playlistId);
    }
    setOpen(false);
  };

  return (
    <div className="songCard">
      <img className="songImage" src={songImg} alt="songImg" />

      <h2 className="songTitle">{songName}</h2>
      <p className="songLength">{songLength}</p>
      <p className="songArtist">{songArtist}</p>

      <button className="songButton" onClick={() => setOpen((prev) => !prev)}>
        Add to Playlist
      </button>

      {open && (
        <div>
          {availablePlaylists.length === 0 && (
            <p>Already in a playlist or no playlists are available.</p>
          )}

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
