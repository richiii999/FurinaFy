import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SongsScreen from "./SongsScreen";
import PlaylistScreen from "./PlaylistScreen";
import ScreenSwitcher from "./ScreenSwitcher";



function MainScreen() {
   return (
    <div className="mainbox">
      <img className="ourqueen" src="../public/furina_sil.png"></img>
     <ScreenSwitcher />

 

      <div className="musicPlayer">
      { /** <MusicPlayer />**/}
      {/** <AudioPlayer audioSrc={'https://www.computerhope.com/jargon/m/example.mp3'} title={"here"}></AudioPlayer>**/}
      
      </div>
    </div>
  );
}

export default MainScreen