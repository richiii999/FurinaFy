<<<<<<< HEAD
import SongCard from "./SongCard"; 
/*temp*/
export const playlistData = [
  { id: 1, name: "playlist", artist:"Test Artist", length: "1:23" },
  { id: 2, name: "Test 2", artist:"Test Artist", length: "1:23" },
  { id: 3, name: "Test 3", artist:"Test Artist", length: "1:23" }
];

function PlaylistScreen({ items }){
    return (
    <div className="PlaylistScreen">
        {items.map((playlistData) => (
        <SongCard
          key={playlistData.id}
          name={playlistData.name}
          artist={playlistData.artist}
          length={playlistData.length}
        />
=======
import PlaylistCard from "./PlaylistCard";

function PlaylistScreen({ //pass in all the items from screenswitcher for playlistscreen to utilize
  items, 
  onDeletePlaylist, 
  onAddToPlaylist, 
  onDeleteSong,
  onCreatePlaylist   
}) {
  return (
    <div className="playlistScreen">

      {/*create a playlist*/}
      <button onClick={onCreatePlaylist}>+ Create Playlist</button>

      {/*checks to see if theres no playlists and prompts for the user to make one*/}
      {items.length === 0 && (
        <p>No playlists yet. Click “Create Playlist”.</p>
      )}

      {items.map((playlist) => ( //prints out the actual playlist card to the screen 
        <div key={playlist.id}> 
          <PlaylistCard
            name={playlist.name}
            songs={playlist.songs}
            playlists={items}
            onAddToPlaylist={onAddToPlaylist}
            onDeleteSong={onDeleteSong}
          />

          <button onClick={() => onDeletePlaylist(playlist.id)}>
            {/*delete playlist button that actually deletes a playlist*/}
            Delete Playlist
          </button>
        </div>
>>>>>>> alitest
      ))}
    </div>
  );
}

export default PlaylistScreen;


