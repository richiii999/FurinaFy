import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SongsScreen from "./SongsScreen";
import PlaylistScreen from "./PlaylistScreen";
import MusicPlayer from "./MusicPlayer";
import ScreenSwitcher from "./ScreenSwitcher";

function MainScreen() {
   return (
    <div>
      <div>

        <ScreenSwitcher />
      </div>

      <div >
        {/* TODO STILL (our main page) */}
      </div>

      <div>
        <MusicPlayer />
      </div>
    </div>
  );
}

export default MainScreen