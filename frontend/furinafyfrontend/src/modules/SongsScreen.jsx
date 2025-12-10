import SongCard from "./SongCard";

function SongsScreen({ onClick }){
    return (
    /*temporary rn replaces these with song cards****/
    <div>

    <button onClick={onClick}><SongCard/></button>
    <button onClick={onClick}><SongCard/></button>
    <button onClick={onClick}><SongCard/></button>
    <button onClick={onClick}><SongCard/></button>
    <button onClick={onClick}><SongCard/></button>

    </div>
    );
};

export default SongsScreen