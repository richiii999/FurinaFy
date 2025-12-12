import SongCard from "./SongCard";

function PlaylistCard(
  { name, songs, playlists, onAddToPlaylist, onDeleteSong, 
    onRemoveFromPlaylist, playlistId, onsong}) {
  


  
  return (
    <div className="PlaylistCard">

     {/* <h2>{name}</h2>*/}



      <button  className="Playbutton"onClick={()=> onsong(song)}>Play: {name}</button>
    
            
      <div className="playcard">
        {songs.length === 0 && <p>No songs yet.</p>}

        {songs.map((song) => (
          <SongCard
            key={song.id || song._id}
            id={song.id || song._id}
            name={song.title}
            artist={song.artist}
            length={song.length}
            picture={song.picture}
            audio={song.audio}
            playlists={playlists}
            onAddToPlaylist={onAddToPlaylist}
            onDeleteSong={onDeleteSong}
            onRemoveFromPlaylist={onRemoveFromPlaylist}
            playlistId={playlistId}
            onClick={()=> handleSongClick(song)}
          />
        ))}
      </div>

      
    </div>


  );
}

export default PlaylistCard;