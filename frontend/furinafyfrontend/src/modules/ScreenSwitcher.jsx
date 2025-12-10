import { useState } from "react";
import SongsScreen, { songs } from "./SongsScreen";
import PlaylistScreen, { playlists } from "./PlaylistScreen";
import SearchBar from "./SearchBar";

function ScreenSwitcher() {
  const [active, setActive] = useState("songs");
  const [query, setQuery] = useState("");

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

      {active === "songs" && <SongsScreen items={filteredSongs} />}
      {active === "playlists" && <PlaylistScreen items={filteredPlaylists} />}
    </div>
  );
}

export default ScreenSwitcher;
