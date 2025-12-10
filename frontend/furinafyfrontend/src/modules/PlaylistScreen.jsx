import PlaylistCard from "./PlaylistCard";

function PlaylistScreen({ items, onDeletePlaylist }) {
  return (
    <div className="playlistScreen">
      {items.length === 0 && (
        <p>No playlists yet. Click “Create Playlist”.</p>
      )}

      {items.map((playlist) => (
        <div>
          <PlaylistCard
            name={playlist.name}
            songs={playlist.songs}
          />
          <button onClick={() => onDeletePlaylist(playlist.id)}>Delete Playlist</button>
        </div>
      ))}
    </div>
  );
}

export default PlaylistScreen;
