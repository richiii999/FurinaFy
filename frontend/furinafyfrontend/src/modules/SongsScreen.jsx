import SongCard from "./SongCard"; 

function SongsScreen({
  items = [],
  playlists = [],
  onAddToPlaylist,
  onDeleteSong,
}) {
  return (
    <div>
      {items.length === 0 && <p>No songs yet. Click “Add Songs”.</p>}

      {items.map((song) => (
        <SongCard
          key={song.id ?? song.name}
          id={song.id}
          name={song.name}
          artist={song.artist}
          length={song.length}
          playlists={playlists}
          onAddToPlaylist={onAddToPlaylist}
          onDeleteSong={onDeleteSong}
        />
      ))}
    </div>
  );
}

export default SongsScreen;
