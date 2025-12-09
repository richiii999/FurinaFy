import songImg from '../assets/kitty.jpg'

function SongCard(){

    const handleClick = () => { 
        console.log("Clicked"); 
    }

    return(
        <div className="songCard">
            <img className='songImage' src={songImg} alt="songImg"></img>
            <h2 className='songTitle'>Name</h2>
            <p className='songLength'>00:00</p>
            <p className='songArtist'>Artist</p>
            <button className='songButton' onClick={() => handleClick()}>Add to Playlist</button>
        </div>
);}

export default SongCard