import SongCard from "./SongCard";

function PlaylistCard({ name, songs }) {
  return (
    <div>
      <h2>{name}</h2>

      <div className>
        {songs.length === 0 && <p>No songs yet.</p>}

        {songs.map((song, index) => (
          <SongCard
            key={index}
            name={song.name}
            artist={song.artist}
            length={song.length}
          />
        ))}
      </div>
    </div>
  );
}

export default PlaylistCard;
