import { useEffect, useState } from "react";
import { getAllSongs } from "./axiom";
import SongsScreen from "./SongsScreen";
import PlaylistScreen from "./PlaylistScreen";
import SearchBar from "./SearchBar";

function ScreenSwitcher() {
  //used to swap between playlist and songs (for searchbar and other things)
  const [active, setActive] = useState("songs");
  const [query, setQuery] = useState("");

  const [songs, setSongs] = useState([]);      
  const [playlists, setPlaylists] = useState([]);


// fetch the songs from DB
useEffect(() => {
  async function loadSongs() {
    try {
      const data = await getAllSongs();
      setSongs(data);
    } catch (err) {
      console.error("Error fetching songs:", err);
    }
  }
  loadSongs();
}, []);
// create a playlist 
const createPlaylist = () => {
  const name = prompt("Enter playlist name:");
  if (!name) return;

  const newPlaylist = {
    id: playlists.length + 1,
    name,
    songs: []
  };

  setPlaylists(prev => [...prev, newPlaylist]);
};

//delete a playlist
const deletePlaylist = (id) => {
  setPlaylists(prev => prev.filter(pl => pl.id !== id));
};

//add a song to a playlist
const onAddToPlaylist = (song, playlistId) => {
  setPlaylists(prev =>
    prev.map(pl =>
      pl.id === playlistId
        ? { ...pl, songs: [...pl.songs, song] }
        : pl
    )
  );
};

//delete a song from songs or playlists (refresh to get the song back)
const deleteSong = (id) => {
  setSongs(prev => prev.filter(s => s._id !== id));

  setPlaylists(prev =>
    prev.map(pl => ({
      ...pl,
      songs: pl.songs.filter(s => s.id !== id)
    }))
  );
};

//filter the songs so that you can easily search 
  const filteredSongs = songs.filter(s =>
    s.title?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <button onClick={() => setActive("songs")}>Songs</button>
      <button onClick={() => setActive("playlists")}>Playlists</button>
      
      <SearchBar mode={active} onSearch={setQuery 
        /*all this line does is sets the specific screen/search bar to the corresponding playlists or song screen*/
        } />

      {active === "songs" && ( //song info
        <SongsScreen
          items={filteredSongs}
          playlists={playlists}
          onAddToPlaylist={onAddToPlaylist}
          onDeleteSong={deleteSong}
          query={query}
        />
      )}

      {active === "playlists" && ( //playlist info 
        <PlaylistScreen
          items={playlists}
          onDeletePlaylist={deletePlaylist}
          onAddToPlaylist={onAddToPlaylist}
          onDeleteSong={deleteSong}
          onCreatePlaylist={createPlaylist}
        />

      )}
    </div>
  );
}

export default ScreenSwitcher;
