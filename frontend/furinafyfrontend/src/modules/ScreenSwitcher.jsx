import { useEffect, useState } from "react";
import { getAllSongs, uploadSong, deleteSongFromDB, getAllPlaylists, createPlaylistInDB, updatePlaylistInDB, deletePlaylistFromDB } from "./axiom";
import SongsScreen from "./SongsScreen";
import PlaylistScreen from "./PlaylistScreen";
import SearchBar from "./SearchBar";

function ScreenSwitcher() {
  //used to swap between playlist and songs (for searchbar and other things)
  const [active, setActive] = useState("songs");
  const [query, setQuery] = useState("");

  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  //fetch the songs and playlists from DB
useEffect(() => {
  async function loadData() {
    try {
      const songData = await getAllSongs();
      const playlistData = await getAllPlaylists();

      console.log("SONGS FROM DB:", songData);
      console.log("PLAYLISTS FROM DB:", playlistData);

      setSongs(songData);
      setPlaylists(playlistData);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  }

  loadData();
}, []);


  // create a playlist and send it to the website/DB
const createPlaylist = async () => {
  const name = prompt("Enter playlist name:");
  if (!name) return;

  try {
    const newPlaylist = {
      name,
      songs: [] 
    };

    const createdPlaylist = await createPlaylistInDB(newPlaylist);

    setPlaylists(prev => [...prev, createdPlaylist]);

    alert("Playlist created!");

  } catch (err) {
    console.error(err);
    alert("Failed to create playlist in DB.");
  }
};
  
  //delete a playlist and update website/DB
  const deletePlaylist = async (playlistId) => {
    console.log(playlistId)
  try {
    await deletePlaylistFromDB(playlistId);

    setPlaylists(prev =>
      prev.filter(pl => String(pl._id) !== String(playlistId))
    );

    alert("Playlist deleted!");
  } catch (err) {
    console.error(err);
    alert("Failed to delete playlist.");
  }
};

  //add a song to a playlist
  const onAddToPlaylist = (song, playlistId) => {
  setPlaylists(prev =>
    prev.map(pl =>
      pl._id === playlistId
        ? { ...pl, songs: [...pl.songs, song._id] }
        : pl
    )
  );
};

//update a playlist and gets sent to DB to store
const onUpdatePlaylist = async (playlistId, songsArray) => {
  try {
    await updatePlaylistInDB(playlistId, { songs: songsArray });

    const freshPlaylists = await getAllPlaylists();

    setPlaylists(
      freshPlaylists.map(pl => ({
        ...pl,
        songs: Array.isArray(pl.songs) ? pl.songs : []
      }))
    );

    alert("Playlist updated!");
  } catch (err) {
    console.error(err);
    alert("Failed to update playlist in DB.");
  }
};


  //delete a song from songs or playlists (deletes from DB)
  const deleteSong = async (id) => {
    console.log(id)
  try {
    //delete the song from DB first
    await deleteSongFromDB(id); 

    //remove from songs screen
    setSongs(prev => prev.filter(s => s.id !== id && s._id !== id));

    //remove from all playlists
    setPlaylists(prev =>
      prev.map(pl => ({
        ...pl,
        songs: pl.songs.filter(s => (s.id || s._id) !== id)
      }))
    );

    alert("Song deleted.");
  } catch (err) {
    console.error(err);
    alert("Failed to delete song from database.");
  }
};



  // remove a song from only ONE playlist
  const removeSongFromPlaylist = (songId, playlistId) => {
  setPlaylists(prev =>
    prev.map(pl =>
      pl._id === playlistId
        ? {
            ...pl,
            songs: pl.songs.filter(id =>
              String(id) !== String(songId)
            )
          }
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

    const normalized = {
    ...created,
  _id: created._id || created.id,  
  };
  alert("Upload Succeessful!")
  setSongs(prev => [...prev, normalized]);
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
    <div className="ScreenSwitcher">
      

     
      <div className="barbar">
      {/****<button onClick={startSongUpload}>Upload Song</button>****/}
      {active === "songs" &&
      <button onClick={startSongUpload}>Upload Song</button>
      }
      <button className="Screenbutton" onClick={() => setActive("songs")}>Songs</button>
      <button className="Screenbutton" onClick={() => setActive("playlists")}>Playlists</button>
      

      <SearchBar mode={active} onSearch={setQuery
        /*all this line does is sets the specific screen/search bar to the corresponding playlists or song screen*/
      } />
      </div>

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
          songs={songs}
          onDeletePlaylist={deletePlaylist}
          onAddToPlaylist={onAddToPlaylist}
          onDeleteSong={deleteSong}
          onCreatePlaylist={createPlaylist}
          onRemoveFromPlaylist={removeSongFromPlaylist}
          onUpdatePlaylist={onUpdatePlaylist}
        />
      )}


    </div>
  );
}

export default ScreenSwitcher;
