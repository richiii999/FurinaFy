import { useEffect, useState, useRef } from "react";
import {
  getAllSongs,
  uploadSong,
  deleteSongFromDB,
  getAllPlaylists,
  createPlaylistInDB,
  updatePlaylistInDB,
  deletePlaylistFromDB
} from "./axiom";

import SongsScreen from "./SongsScreen";
import PlaylistScreen from "./PlaylistScreen";
import SearchBar from "./SearchBar";

function ScreenSwitcher() {
  //the different states for the website - songs and playlists
  const [active, setActive] = useState("songs");
  const [query, setQuery] = useState("");

  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  //audio and image input 
  const audioInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  //loads all songs and playlists from DB
  useEffect(() => {
    async function loadData() {
      try {
        setSongs(await getAllSongs());
        setPlaylists(await getAllPlaylists());
      } catch (err) {
        console.error("Error loading data:", err);
      }
    }
    loadData();
  }, []);

  //create a playlist for website/DB
  const createPlaylist = async () => {
    const name = prompt("Enter playlist name:");
    if (!name) return;

    try {
      const created = await createPlaylistInDB({ name, songs: [] });
      setPlaylists(prev => [...prev, created]);
      alert("Playlist created!");
    } catch {
      alert("Failed to create playlist.");
    }
  };

  //delete playlist from website/DB
  const deletePlaylist = async (playlistId) => {
    console.log(playlistId)
    try {
      await deletePlaylistFromDB(playlistId);
      setPlaylists(prev => prev.filter(pl => pl._id !== playlistId));
      alert("Playlist deleted!");
    } catch {
      alert("Failed to delete playlist.");
    }
  };
  //add a song to the playlist
  const onAddToPlaylist = (song, playlistId) => {
    setPlaylists(prev =>
      prev.map(pl =>
        pl._id === playlistId
          ? { ...pl, songs: [...pl.songs, song._id] }
          : pl
      )
    );
  };
  
  //update a playlist in the DB with the current playlist on your website
  const onUpdatePlaylist = async (playlistId, songsArray) => {
    try {
      await updatePlaylistInDB(playlistId, { songs: songsArray });
      setPlaylists(await getAllPlaylists());
      alert("Playlist updated!");
    } catch {
      alert("Failed to update playlist.");
    }
  };

  //remove a song from your playlist on the website
  const removeSongFromPlaylist = (songId, playlistId) => {
    setPlaylists(prev =>
      prev.map(pl =>
        pl._id === playlistId
          ? { ...pl, songs: pl.songs.filter(id => id !== songId) }
          : pl
      )
    );
  };

  //delete a song from the website/DB
  const deleteSong = async (id) => {
    try {
      await deleteSongFromDB(id);
      setSongs(prev => prev.filter(s => s._id !== id));
      setPlaylists(prev =>
        prev.map(pl => ({
          ...pl,
          songs: pl.songs.filter(songId => songId !== id)
        }))
      );
      alert("Song deleted.");
    } catch {
      alert("Failed to delete song.");
    }
  };

  //upload a song to the website/DB
  async function uploadSelectedSong() {
    if (!audioFile || !imageFile) {
      alert("Select both an audio file and an image.");
      return;
    }

    try {
      const metadata = await askSongMetadata();
      if (!metadata) return;

      const songBase64 = await fileToBase64(audioFile);
      const imageBase64 = await fileToBase64(imageFile);
      
      const created = await uploadSong({
        title: metadata.title,
        length: metadata.length,
        artist: metadata.artist,
        song: songBase64,
        picture: imageBase64
      });
      console.log(created.artist)
      setSongs(prev => [...prev, { ...created, _id: created._id || created.id }]);

      setAudioFile(null);
      setImageFile(null);
      audioInputRef.current.value = "";
      imageInputRef.current.value = "";

      alert("Upload successful!");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  }
  
  //convert audio/image files to base64
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  //prompt user for title, song duration, and artist name 
  async function askSongMetadata() {
    const title = prompt("Song title:");
    const length = prompt("Song length (ex: 3:45):");
    const artist = prompt("Artist name:");

    if (!title || !length || !artist) return null;
    return { title, length, artist };
  }

  //filter songs/playlists
  const filteredSongs = songs.filter(s =>
    s.title?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPlaylists = playlists.filter(pl =>
    pl.name?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="ScreenSwitcher"> 
    {/*added hidden buttons, one for audio and one for image since modern browsers hate it*/}
      <div className="barbar"> 
        <input
          type="file"
          accept="audio/*"
          hidden
          ref={audioInputRef}
          onChange={e => setAudioFile(e.target.files[0] || null)}
        />

        <input
          type="file"
          accept="image/*"
          hidden
          ref={imageInputRef}
          onChange={e => setImageFile(e.target.files[0] || null)}
        />
        {/*update button, with the audio and image buttons*/}
        {active === "songs" && (
          <>
            <button
              className="Screenbutton"
              onClick={() => audioInputRef.current.click()}
            >
              Choose Audio
            </button>

            <button
              className="Screenbutton"
              onClick={() => imageInputRef.current.click()}
            >
              Choose Image
            </button>

            <button
              className="Screenbutton"
              disabled={!audioFile || !imageFile}
              onClick={uploadSelectedSong}
            >
              Upload Song
            </button>
          </>
        )}
        {/*songs/playlist buttons*/}
        <button className="Screenbutton" onClick={() => setActive("songs")}>
          Songs
        </button>
        <button className="Screenbutton" onClick={() => setActive("playlists")}>
          Playlists
        </button>

        <SearchBar mode={active} onSearch={setQuery} /> {/*triggers the different searchbar, one for playlist other for songs*/}
      </div>

      {active === "songs" && ( //songs screen 
        <SongsScreen
          items={filteredSongs}
          playlists={playlists}
          onAddToPlaylist={onAddToPlaylist}
          onDeleteSong={deleteSong}
          query={query}
        />
      )}

      {active === "playlists" && ( //playlists screen
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
