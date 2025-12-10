import PlaylistCard from "./PlaylistCard";

function PlaylistScreen({ items }) {
  return (
    <div className="playlistScreen">
      {items.length === 0 && (
        <p>No playlists yet. Click “Create Playlist”.</p>
      )}

      {items.map((playlist) => (
        <PlaylistCard
          key={playlist.id}
          name={playlist.name}
          songs={playlist.songs}
        />
      ))}
    </div>
  );
}

export default PlaylistScreen;
