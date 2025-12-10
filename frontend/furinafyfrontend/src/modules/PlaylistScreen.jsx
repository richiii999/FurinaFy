import PlaylistCard from "./PlaylistCard";

//dummy data, dunno wtf to do forr this atm but works  
export const playlists = [
  {
    id: 1,
    name: "My Playlist 1",
    songs: [
      { name: "Test 1", artist: "Test Artist", length: "1:23" },
    ]
  },
  {
    id: 2,
    name: "Chill Mix",
    songs: [
      { name: "Lo-Fi Beat", artist: "Cool Guy", length: "2:10" },
    ]
  }
];

function PlaylistScreen({ items }) {
  return (
    <div className="playlistScreen">
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
