import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SongsScreen from "./SongsScreen";
import PlaylistScreen from "./PlaylistScreen";
import ScreenSwitcher from "./ScreenSwitcher";



function MainScreen() {
   return (
    <div className="mainbox">
      <img className="ourqueen" src="../public/music.png"></img>
      <img className="ourqueen" src="../public/furina_sil.png"></img>
       <img className="ourqueen" src="../public/music1.png"></img>
     <ScreenSwitcher />



    </div>
  );
}

export default MainScreen