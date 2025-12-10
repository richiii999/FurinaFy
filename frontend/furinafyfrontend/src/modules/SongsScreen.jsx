import SongCard from "./SongCard";

function SongsScreen({ items = [], playlists = [], query = "", onAddToPlaylist, onDeleteSong }) {
  const safeQuery = query.toLowerCase();

  const filtered = items.filter(song =>
    song.title?.toLowerCase().includes(safeQuery)
  );

  return (
    <div className="songs-container">
      {filtered.map(song => (
        <SongCard
          key={song._id}
          id={song._id}
          name={song.title}
          length={song.length}
          artist={song.artist || "Unknown Artist"}
          picture={song.picture}
          audio={song.song}
          playlists={playlists}
          onAddToPlaylist={onAddToPlaylist}
          onDeleteSong={onDeleteSong}
        />
      ))}
    </div>
  );
}

export default SongsScreen;
