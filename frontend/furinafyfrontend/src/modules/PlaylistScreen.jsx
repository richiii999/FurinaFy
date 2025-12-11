import PlaylistCard from "./PlaylistCard";

function PlaylistScreen({
  items,
  songs,
  onDeletePlaylist,
  onAddToPlaylist,
  onDeleteSong,
  onCreatePlaylist,
  onRemoveFromPlaylist
}) {
  return (
    <div className="playlistScreen">

      <button onClick={onCreatePlaylist}>+ Create Playlist</button>

      {items.length === 0 && (
        <p>No playlists yet. Click “Create Playlist”.</p>
      )}

      {items.map((playlist) => (
        <div key={playlist._id}> 
          <PlaylistCard
            name={playlist.name}
            songs={playlist.songs
            .map(id => songs.find(song => String(song._id) === String(id)))
           .filter(Boolean)
            }
            playlists={items}
            onAddToPlaylist={onAddToPlaylist}
            onDeleteSong={onDeleteSong}
            onRemoveFromPlaylist={onRemoveFromPlaylist}
            playlistId={playlist._id}
          />

          <button onClick={() => onDeletePlaylist(playlist._id)}>
            Delete Playlist
          </button>
        </div>
      ))}
    </div>
  );
}

export default PlaylistScreen;
