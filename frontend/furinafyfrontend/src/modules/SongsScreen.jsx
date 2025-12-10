import SongCard from "./SongCard";
/* duummy data */
export const songs = [
  { id: 1, name: "Test 1", artist:"Test Artist", length: "1:23" },
  { id: 2, name: "Test 2", artist:"Test Artist", length: "1:23" },
  { id: 3, name: "Test 3", artist:"Test Artist", length: "1:23" }
];

function SongsScreen({ items }) {
  return (
    <div>
      {items.map((song) => (
        <SongCard
          key={song.id}
          name={song.name}
          artist={song.artist}
          length={song.length}
        />
      ))}
    </div>
  );
}

export default SongsScreen