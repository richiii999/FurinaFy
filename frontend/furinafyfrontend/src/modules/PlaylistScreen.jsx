import SongCard from "./SongCard"; 
/*temp*/
export const playlistData = [
  { id: 1, name: "Test 1", artist:"Test Artist", length: "1:23" },
  { id: 2, name: "Test 2", artist:"Test Artist", length: "1:23" },
  { id: 3, name: "Test 3", artist:"Test Artist", length: "1:23" }
];

function PlaylistScreen({ items }){
    return (
    <div>
        {items.map((playlistData) => (
        <SongCard
          key={playlistData.id}
          name={playlistData.name}
          artist={playlistData.artist}
          length={playlistData.length}
        />
      ))}
    </div>
    );
}
export default PlaylistScreen