import PlaylistCard from "./PlaylistCard";
import {useState} from "react";
import MusicPlayer from "./MusicPlayer"


function PlaylistScreen({ //pass in all the items from screenswitcher for playlistscreen to utilize
 items,
  songs,
  onDeletePlaylist,
  onAddToPlaylist,
  onDeleteSong,
  onCreatePlaylist,
  onRemoveFromPlaylist,
  onUpdatePlaylist 
}) {

const [curr,setcurr] = useState(null);
const [queue, setQueue] = useState([]);
const [index, setIndex] = useState(0);

function handleSongClick(song){
setQueue([song]); 
setIndex(0);
setcurr({

audioSrc:song.song,
title: song.title,
imagine:song.picture

});

}

function onlist(songs) {
  if (!songs || songs.length === 0) return;
  setQueue(songs);
  setIndex(0);


const first = songs[0];
  setcurr({
    audioSrc: first.song,
    title: first.title,
    imagine: first.picture
  });


}


  function handleSongEnd() {
    if (index + 1 >= queue.length) 
      return; 

    const nextsong = index + 1;
    setIndex(nextsong);
    const nextnextsong = queue[nextsong];
    setcurr({
    audioSrc: nextnextsong.song,
    title: nextnextsong.title,
    imagine: nextnextsong.picture
  });

  }

function handleNext() {
    if (index + 1 >= queue.length) return;

   const nextsong = index + 1;
    setIndex(nextsong);
    const nextnextsong = queue[nextsong];
    setcurr({
    audioSrc: nextnextsong.song,
    title: nextnextsong.title,
    imagine: nextnextsong.picture
  });
  }

function handlePrev() {
    if (index === 0) return;

    const previndex = index - 1;
    setIndex(previndex);
     const prevsong = queue[previndex];
    setcurr({
    audioSrc: prevsong.song,
    title: prevsong.title,
    imagine: prevsong.picture
  });
  }


  return (
    <div className="playlistScreen">

      {/*create a playlist*/}
      <button  className="Screenbutton" onClick={onCreatePlaylist}>+ Create Playlist</button>

      {/*checks to see if theres no playlists and prompts for the user to make one*/}
      {items.length === 0 && (
        <p>No playlists yet. Click “Create Playlist”.</p>
      )}

      {items.map((playlist) => ( //prints out the actual playlist card to the screen 
        <div key={playlist.id}> 
          <PlaylistCard
            name={playlist.name}
            songs={(playlist.songs || [])
            .map(id => songs.find(song => String(song._id) === String(id)))
             .filter(Boolean)
           }
            playlists={items}
             onAddToPlaylist={onAddToPlaylist}
            onDeleteSong={onDeleteSong}
             onRemoveFromPlaylist={onRemoveFromPlaylist}
            playlistId={playlist._id}

            onsong={handleSongClick}/***<---- so if songcard clicked song play**/



            /***********collects all the songs and calls function to play the playlist*************** */
             onlist={() => onlist(
              (playlist.songs || [])
            .map(id => songs.find(song => String(song._id) === String(id)))
             .filter(Boolean)


             )}




          />







          <button className="Screenbutton" onClick={() => onDeletePlaylist(playlist.id)}>
            {/*delete playlist button that actually deletes a playlist*/}
            Delete Playlist
          </button>


          <button
           className="Screenbutton" 
      onClick={() =>
         onUpdatePlaylist(
         playlist._id,
      (items.find(p => p._id === playlist._id)?.songs || []) )
      }> Update Playlist</button>
 

        </div>
      ))}




 <MusicPlayer audioSrc={curr?.audioSrc} title={curr?.title} imagine={curr?.imagine} onSongEnd={handleSongEnd} onNext={handleNext} onPrev={handlePrev} showPlaylistControls={true}></MusicPlayer>
    </div>
  );
}

export default PlaylistScreen;


