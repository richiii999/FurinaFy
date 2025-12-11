import SongCard from "./SongCard";

function PlaylistCard({ name, songs, playlists, onAddToPlaylist, onDeleteSong }) {
 
 
 
 
  return (
    <div>
      <h2>{name}</h2>

      <div>
        {songs.length === 0 && <p>No songs yet.</p>}

        {songs.map((song) => (
          <SongCard
            key={song.id}
            id={song.id}
            name={song.name}
            artist={song.artist}
            length={song.length}
            picture={song.picture}
            audio={song.audio}
            playlists={playlists}
            onAddToPlaylist={onAddToPlaylist}
            onDeleteSong={onDeleteSong}
          />
        ))}
      </div>
    </div>
  );
}

export default PlaylistCard;

