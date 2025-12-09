import React, { useState } from "react";

function SearchBar({ mode = "songs", onSearch }) {
  const [value, setValue] = useState("");

  const placeholder =
    mode === "songs" ? "Search Songs..." : "Search Playlists...";

    
  const handleChange = (e) => {
    const text = e.target.value;
    setValue(text);
    onSearch?.(text);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}

export default SearchBar