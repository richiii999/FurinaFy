import SongCard from "./SongCard";

function PlaylistCard(
  { name, songs, playlists, onAddToPlaylist, onDeleteSong, 
    onRemoveFromPlaylist, playlistId, onsong }) {
  


  
  
  return (
    <div>

      /*********buttons */
      <h2>{name}</h2>
      <button  className="Screenbutton"onClick={()=> onsong(song)}>Playthelist</button>
      /**************buttons */
      
      
      <div className="playcard">
        {songs.length === 0 && <p>No songs yet.</p>}

        {songs.map((song) => (
          <SongCard
            key={song.id || song._id}
            id={song.id || song._id}
            name={song.name}
            artist={song.artist}
            length={song.length}
            picture={song.picture}
            audio={song.audio}
            playlists={playlists}
            onAddToPlaylist={onAddToPlaylist}
            onDeleteSong={onDeleteSong}
            onRemoveFromPlaylist={onRemoveFromPlaylist}
            playlistId={playlistId}
            onClick={()=> onsong(song)}
          />
        ))}
      </div>

      
    </div>


  );
}

export default PlaylistCard;