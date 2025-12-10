import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SongsScreen from "./SongsScreen";
import PlaylistScreen from "./PlaylistScreen";
import MusicPlayer from "./MusicPlayer";
import ScreenSwitcher from "./ScreenSwitcher";


function MainScreen() {
   return (
    <div className="mainbox">

     <ScreenSwitcher />

 

      <div className="musicPlayer">
        <MusicPlayer />
      </div>
    </div>
  );
}

export default MainScreen