import { useState } from "react";
import SongsScreen from "./SongsScreen";
import PlaylistScreen from "./PlaylistScreen";
import SearchBar from "./SearchBar";

function ScreenSwitcher() {
  const [active, setActive] = useState("songs");
  const [query, setQuery] = useState("");
  
  //dynamic songs/playlists 
  const [songs, setSongs] = useState([]);

  const [playlists, setPlaylists] = useState([]);

  const createPlaylist = () => {
    const name = prompt("Enter playlist name:");
    if (!name) return;

    const newPlaylist = {
      id: playlists.length + 1,
      name,
      songs: []
    };

    setPlaylists([...playlists, newPlaylist]);
  };

  const createSong = () => {
    const name = prompt("Song Name:");
    if (!name) return;

    const artist = prompt("Artist:");
    if (!artist) return;

    const length = prompt("Length (e.g. 2:11):");
    if (!length) return;

    const newSong = {
      id: songs.length + 1,
      name,
      artist,
      length,
    };

    setSongs([...songs, newSong]);
  };

   const onAddToPlaylist = (song, playlistId) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlistId
          ? { ...pl, songs: [...pl.songs, song] }
          : pl
      )
    );
  };

  const filteredSongs = songs.filter((s1) =>
    s1.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPlaylists = playlists.filter((pl) =>
    pl.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <button onClick={() => setActive("songs")}>Songs</button>
      <button onClick={() => setActive("playlists")}>Playlists</button>

      <SearchBar mode={active} onSearch={(text) => setQuery(text)} />

      {active === "songs" && (
        <button onClick={createSong}>+ Add Song</button>
      )}

      {active === "playlists" && (
        <button onClick={createPlaylist}>+ Create Playlist</button>
      )}

      {active === "songs" && (
        <SongsScreen
          items={filteredSongs}
          playlists={playlists}
          onAddToPlaylist={onAddToPlaylist}
        />
      )}

      {active === "playlists" && (
        <PlaylistScreen items={filteredPlaylists} />
      )}
    </div>
  );
}

export default ScreenSwitcher;
