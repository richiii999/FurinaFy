import { useEffect, useState } from "react";
import { getAllSongs, uploadSong } from "./axiom";
import SongsScreen from "./SongsScreen";
import PlaylistScreen from "./PlaylistScreen";
import SearchBar from "./SearchBar";

function ScreenSwitcher() {
  //used to swap between playlist and songs (for searchbar and other things)
  const [active, setActive] = useState("songs");
  const [query, setQuery] = useState("");

  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  //fetch the songs from DB
  useEffect(() => {
    async function loadSongs() {
      try {
        const data = await getAllSongs();
        setSongs(data);
      } catch (err) {
        console.error("Error fetching songs:", err);
      }
    }
    loadSongs();
  }, []);

  // create a playlist 
  const createPlaylist = () => {
    const name = prompt("Enter playlist name:");
    if (!name) return;

    const newPlaylist = {
      id: playlists.length + 1,
      name,
      songs: []
    };

    setPlaylists(prev => [...prev, newPlaylist]);
  };
  
  //delete a playlist
  const deletePlaylist = (id) => {
    setPlaylists(prev => prev.filter(pl => pl.id !== id));
  };

  //add a song to a playlist
  const onAddToPlaylist = (song, playlistId) => {
    setPlaylists(prev =>
      prev.map(pl =>
        pl.id === playlistId
          ? { ...pl, songs: [...pl.songs, song] }
          : pl
      )
    );
  };

  //delete a song from songs or playlists (refresh to get the song back)
  const deleteSong = (id) => {
    setSongs(prev => prev.filter(s => s._id !== id));
    setPlaylists(prev =>
      prev.map(pl => ({
        ...pl,
        songs: pl.songs.filter(s => s._id !== id)
      }))
    );
  };

  //file converter
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

  //upload an image and delay response (it works)  
 function awaitFilePick(inputEl) {
  return new Promise((resolve, reject) => {
    inputEl.onchange = () => resolve(inputEl.files[0] || null);
    inputEl.onerror = reject;
  });
}

//handles the upload for files to be added to DB 
async function handleUpload(e) {
  const audioFile = e.target.files[0];
  if (!audioFile) return;

  const base64Song = await fileToBase64(audioFile);

  //create image picker and attach
  const imgPicker = document.createElement("input");
  imgPicker.type = "file";
  imgPicker.accept = "image/*";
  imgPicker.style.display = "none";
  document.body.appendChild(imgPicker);

  //trigger the picker immediately while still in the user gesture
  imgPicker.click();

  //wait for file selection
  const imgFile = await awaitFilePick(imgPicker);
  document.body.removeChild(imgPicker);

  if (!imgFile) {
    alert("You must upload a picture.");
    return;
  }

  //now ask for metadata
  const title = prompt("Enter song title:");
  const length = prompt("Enter song length (ex: 3:45)");
  const artist = prompt("Enter the artist name");
  if (!title || !length || !artist) {
    alert("Missing song title, length or artist.");
    return;
  }

  const base64Pic = await fileToBase64(imgFile);

  const newSong = { title, length, artist, picture: base64Pic, song: base64Song };

  try {
    const created = await uploadSong(newSong);
    setSongs(prev => [...prev, created]);
  } catch (err) {
    console.error("Upload failed:", err);
    alert("Upload failed.");
  }
}

  //filter the songs and playlists so that you can easily search 
  const filteredSongs = songs.filter(s =>
    s.title?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPlaylists = playlists.filter(pl =>
    pl.name?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleUpload} />

      <button onClick={() => setActive("songs")}>Songs</button>
      <button onClick={() => setActive("playlists")}>Playlists</button>

      <SearchBar mode={active} onSearch={setQuery
        /*all this line does is sets the specific screen/search bar to the corresponding playlists or song screen*/
      } />

      {active === "songs" && ( //song info
        <SongsScreen
          items={filteredSongs}
          playlists={playlists}
          onAddToPlaylist={onAddToPlaylist}
          onDeleteSong={deleteSong}
          query={query}
        />
      )}

      {active === "playlists" && ( //playlist info
        <PlaylistScreen
          items={filteredPlaylists}
          onDeletePlaylist={deletePlaylist}
          onAddToPlaylist={onAddToPlaylist}
          onDeleteSong={deleteSong}
          onCreatePlaylist={createPlaylist}
        />
      )}
    </div>
  );
}

export default ScreenSwitcher;
