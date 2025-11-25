import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SongsScreen from "./SongsScreen";
import PlaylistScreen from "./PlaylistScreen";
import MusicPlayer from "./MusicPlayer";

function MainScreen() {
  const [searchMode, setSearchMode] = useState("songs"); 

  const handleSearch = (query) => {
    if (searchMode === "songs") {

      console.log("Searching songs:", query);

    } else {
      console.log("Searching playlists:", query);

    }
  };

  return (
    <div className= "mainbox">
      <div>

        <SearchBar mode={searchMode} onSearch={handleSearch} />
      
        <SongsScreen onClick={() => setSearchMode("songs")} />
        
        
        {/*settings button is in playlist screen fyi***/}
        <PlaylistScreen onClick={() => setSearchMode("playlists")} />
   
       
      </div>

      <div >
        {/* TODO STILL (our main page) */}
      </div>

      <div className="musicPlayer">
        <MusicPlayer />
      </div>
    </div>
  );
}

export default MainScreen