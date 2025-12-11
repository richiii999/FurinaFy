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
  setSongs(prev => prev.filter(s => s.id !== id && s._id !== id));
  setPlaylists(prev =>
     prev.map(pl => ({
       ...pl,
       songs: pl.songs.filter(s => s.id !== id && s._id !== id)
     }))
   );
 };


  // remove a song from only ONE playlist
  const removeSongFromPlaylist = (songId, playlistId) => {
  setPlaylists(prev =>
      prev.map(pl =>
        pl.id === playlistId
          ? { ...pl, songs: pl.songs.filter(s => s.id !== songId && s._id !== songId) }
          : pl
      )
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

  //deals with delay and allows multiple file uploads  
 function pickFile(accept) {
  return new Promise(resolve => {
    const picker = document.createElement("input");
    picker.type = "file";
    picker.accept = accept;
    picker.style.display = "none";

    picker.onchange = () => resolve(picker.files[0] || null);

    document.body.appendChild(picker);
    picker.click();

    picker.addEventListener("change", () => {
      setTimeout(() => picker.remove(), 0);
    });
  });
}

//handles the upload for files to be added to DB 
async function startSongUpload() {
  try {
    const audioFile = await pickFile("audio/*");
    if (!audioFile) return;

    const imgFile = await pickFile("image/*");
    if (!imgFile) {
      alert("You must upload a picture.");
      return;
    }

    //prompt for title, length, artist 
    const metadata = await askSongMetadata();
    if (!metadata) return;

    const base64Song = await fileToBase64(audioFile);
    const base64Pic = await fileToBase64(imgFile);

    const newSong = {
      title: metadata.title,
      length: metadata.length,
      artist: metadata.artist,
      picture: base64Pic,
      song: base64Song
    };

    const created = await uploadSong(newSong);
    setSongs(prev => [...prev, created]);

    alert("Song uploaded!");

  } catch (err) {
    console.error(err);
    alert("Upload failed.");
  }
}

//ask for specific info from user
async function askSongMetadata() {
  const title = prompt("Enter song title:");
  const length = prompt("Enter song length (ex: 3:45)");
  const artist = prompt("Enter the artist name:");

  if (!title || !length || !artist) {
    alert("Missing metadata.");
    return null;
  }

  return { title, length, artist };
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
      {active === "songs" &&
      <button onClick={startSongUpload}>Upload Song</button>
      }
      
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
          onRemoveFromPlaylist={removeSongFromPlaylist}
        />
      )}
    </div>
  );
}

export default ScreenSwitcher;
