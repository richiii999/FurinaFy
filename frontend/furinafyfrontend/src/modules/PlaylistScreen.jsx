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
      <button  className="Screenbutton"onClick={onCreatePlaylist}>+ Create Playlist</button>

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

          <button className="delete_playlist" onClick={() => onDeletePlaylist(playlist.id)}>
            {/*delete playlist button that actually deletes a playlist*/}
            Delete Playlist
          </button>
        </div>
      ))}
    </div>
  );
}

export default PlaylistScreen;


