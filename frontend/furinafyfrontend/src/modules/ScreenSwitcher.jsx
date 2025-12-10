import { useState } from "react";
import SongsScreen, { songsData } from "./SongsScreen";
import PlaylistScreen, { playlistData } from "./PlaylistScreen";
import SearchBar from "./SearchBar";

function ScreenSwitcher() {
  const [active, setActive] = useState("songs");
  const [query, setQuery] = useState("");

  const filteredSongs = songsData.filter((song) =>
    song.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPlaylists = playlistData.filter((pl) =>
    pl.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="ScreenSwitcher">
      <div className="barbar">
      <button className="Screenbutton" onClick={() => setActive("songs")}>Songs</button>
      <button className="Screenbutton" onClick={() => setActive("playlists")}>Playlists</button>

      <SearchBar mode={active} onSearch={(text) => setQuery(text)} />


      </div>


      {active === "songs" && <SongsScreen items={filteredSongs} />}
      {active === "playlists" && <PlaylistScreen items={filteredPlaylists} />}
    </div>
  );
}

export default ScreenSwitcher;
