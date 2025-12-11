import songImg from '../../public/furina.png'
import { useState } from 'react';

function SongCard({name, length, artist}){
    
    // Song information
    let songName   = name   ? name   : "Song Name"
    let songLength = length ? length : "0:00"
    let songArtist = artist ? artist : "Song Artist"

    // Each checkbox must have a unique ID, we can use the song's name
    let check1 = songName+"check1"
    let check2 = songName+"check2"
    let check3 = songName+"check3"

    // Handle checkbox state changes
    const [checked, setChecked] = useState({});

    const handleChange = (e) => { 
        console.log("Checked: " + e.target.id); // Print the name of the checkbox
        
        // TODO: Actually adds the song to the playlist (1, 2, or 3)
    }

    return(
        <div className="songCard">
            <img className='songImage' src={songImg} alt="songImg"></img>
            <h2 className='songTitle'>{songName}</h2>
            <p className='songLength'>{songLength}</p>
            <p className='songArtist'>{songArtist}</p>
            <button className='songButton' onClick={() => handleClick()}>Add to Playlist

                    <div className="songDropdown">
                <div>
                    <input type="checkbox" checked={checked.check1} onChange={handleChange} id={check1} name={check1} value={check1}></input>
                    <label htmlFor={check1}> Add to Playlist 1</label>
                </div>
                <div>
                    <input type="checkbox" checked={checked.check2} onChange={handleChange} id={check2} name={check2} value={check2}></input>
                    <label htmlFor={check2}> Add to Playlist 2</label>
                </div>
                <div>
                    <input type="checkbox" checked={checked.check3} onChange={handleChange} id={check3} name={check3} value={check3}></input>
                    <label htmlFor={check3}> Add to Playlist 3</label>
                </div>
            </div>
            </button>
        
        </div>
);}

export default SongCard