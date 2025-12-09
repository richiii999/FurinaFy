import { useState } from "react";
import PlaylistScreen from "./PlaylistScreen";
import SongsScreen from "./SongsScreen";
import SearchBar from "./SearchBar";

function ScreenSwitcher() {
  const [active, setActive] = useState("songs"); // "songs" or "playlists"

  const handleSearch = (query) => {
    if (active === "songs") {
      console.log("Searching songs:", query);
    } else {
      console.log("Searching playlists:", query);
    }
  };

  return (
    <div>
      
      {/* buttons */}
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setActive("songs")}>Songs</button>
        <button onClick={() => setActive("playlists")} style={{ marginLeft: 8 }}>
          Playlists
        </button>
      </div>

      {/* searchbar swaps automatically based on active screen */}
      <SearchBar
        mode={active}
        onSearch={handleSearch}
      />

      {/* screen content */}
      <div style={{ marginTop: 16 }}>
        {active === "songs" && <SongsScreen />}
        {active === "playlists" && <PlaylistScreen />}
      </div>
    </div>
  );
}

export default ScreenSwitcher;
