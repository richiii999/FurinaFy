import songImg from '../assets/kitty.jpg'

function SongCard({name, length, artist}){
    
    // Song information
    let songName   = name   ? name   : "Song Name"
    let songLength = length ? length : "0:00"
    let songArtist = artist ? artist : "Song Artist"

    // Each checkbox must have a unique ID, we can use the song's name
    let check1 = songName+"check1"
    let check2 = songName+"check2"
    let check3 = songName+"check3"

    const handleClick = () => { 
        console.log("Clicked " + songName); 
    }

    return(
        <div className="songCard">
            <img className='songImage' src={songImg} alt="songImg"></img>
            <h2 className='songTitle'>{songName}</h2>
            <p className='songLength'>{songLength}</p>
            <p className='songArtist'>{songArtist}</p>
            <button className='songButton' onClick={() => handleClick()}>Add to Playlist</button>
            <div className="songDropdown">
                <div>
                    <input type="checkbox" id={check1} name={check1} value={check1}></input>
                    <label htmlFor={check1}> Add to Playlist 1</label>
                </div>
                <div>
                    <input type="checkbox" id={check2} name={check2} value={check2}></input>
                    <label htmlFor={check2}> Add to Playlist 2</label>
                </div>
                <div>
                    <input type="checkbox" id={check3} name={check3} value={check3}></input>
                    <label htmlFor={check3}> Add to Playlist 3</label>
                </div>
            </div>
        </div>
);}

export default SongCard