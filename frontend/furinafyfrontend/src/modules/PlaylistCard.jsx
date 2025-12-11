import SongCard from "./SongCard";

function PlaylistCard({ name, songs, playlists, onAddToPlaylist, onDeleteSong, onRemoveFromPlaylist, playlistId }) {
  return (
    <div>
      <h2>{name}</h2>

      <div>
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
          />
        ))}
      </div>
    </div>
  );
}

export default PlaylistCard;

