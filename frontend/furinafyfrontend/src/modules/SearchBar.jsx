import React, { useState } from "react";

function SearchBar({ mode = "songs", onSearch }) { //swaps between songs and playlists, allows users to do searches
  const [value, setValue] = useState("");

  const placeholder = //checks to see if the active mode is song, sets the searchbar to song otherwise it swaps to playlist
    mode === "songs" ? "Search Songs..." : "Search Playlists...";

    
  const handleChange = (e) => { //this actually does the swapping
    const text = e.target.value;
    setValue(text);
    onSearch?.(text);
  };

  return (
    <input
      className="searchBar"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}

export default SearchBar