import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SongsScreen from "./SongsScreen";
import PlaylistScreen from "./PlaylistScreen";
import ScreenSwitcher from "./ScreenSwitcher";
import MusicPlayer from "./MusicPlayer";


function MainScreen() {
   return (
    <div className="mainbox">

     <ScreenSwitcher />

 

      <div className="musicPlayer">
      { /** <MusicPlayer />**/}
      {/** <AudioPlayer audioSrc={'https://www.computerhope.com/jargon/m/example.mp3'} title={"here"}></AudioPlayer>**/}
      
      </div>
    </div>
  );
}

export default MainScreen